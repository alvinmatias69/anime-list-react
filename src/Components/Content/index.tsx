import * as React from 'react';

import './index.css';

import { getData } from './service';

import Card from './Card';
import Loading from './LoadingIndicator';

export interface Props {
    match: any
}

interface State {
    anime: DataProps,
    drama: DataProps,
    loading: boolean,
    manga: DataProps,
    query: string,
    type: string,
}

export interface Data {
    image: string,
    score: number,
    status: string,
    title: string,
}

interface DataProps {
    data: Data[],
    page: number
}

const baseUrl: string = 'https://kitsu.io/api/edge/';
const itemPerPage: number = 10;
const params = {
    'page[limit]': itemPerPage,
    sort: 'ratingRank',
};

class Content extends React.Component<Props, State> {
    constructor (props: Props) {
        super(props);

        const { type } = props.match.params;

        this.state = {
            anime: {
                data: [],
                page: 0
            },
            drama: {
                data: [],
                page: 0
            },
            loading: true,
            manga: {
                data: [],
                page: 0
            },
            query: '',
            type,
        };

        this.processData = this.processData.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.handleQuery = this.handleQuery.bind(this);

        getData(baseUrl+type, params, this.processData);
    }

    public componentWillReceiveProps (nextProps: Props) {
        const { type } = nextProps.match.params;
        let loading: boolean = false;

        if (!this.state[type].data.length) {
            getData(baseUrl+type, params, this.processData);
            loading = true;
        }

        this.setState({ type, loading });
    }

    private nextPage () {
        const { type } = this.state;
        const newParams: any = {
            ...params,
            'page[offset]': itemPerPage * this.state[type].page
        };
        this.setState({loading: true});
        getData(baseUrl+type, newParams, this.processData);
    }

    public processData (response: any) {
        const { data } = response.data;
        const processed: Data[] = data.map((datum: any) => {
            const { attributes } = datum;
            const processedDatum: Data = {
                image: attributes.posterImage.small,
                score: Number(attributes.averageRating),
                status: attributes.status,
                title: attributes.titles.en_jp || attributes.titles.en || attributes.titles.en_us || '',
            }
            return processedDatum;
        });
        this.setData(processed);
    }

    private setData (data: Data[]) {
        const { type, anime, drama, manga } = this.state;
        switch (type) {
            case 'anime': {
                this.setState({anime: {data: anime.data.concat(data), page: anime.page + 1}, loading: false});
                break;
            }
            case 'drama': {
                this.setState({drama: {data: drama.data.concat(data), page: drama.page + 1}, loading: false});
                break;
            }
            case 'manga': {
                this.setState({manga: {data: manga.data.concat(data), page: manga.page + 1}, loading: false});
                break;
            }
        }
    }

    private renderContent (data: Data[]) {
        const { loading, query } = this.state;
        if (!data.length && !loading) {
            return (
                <h2>Whoops, there's no data in this section</h2>
            );
        }
        const content: any = data.filter(item => item.title.toUpperCase().includes(query.toLocaleUpperCase()))
                                 .map((item: Data, index: number) => <Card {...item} key={index.toString()} />);
        return content;
    }

    private handleQuery (event: any) {
        this.setState({ query: event.target.value })
    }

    public render () {
        const { type, loading } = this.state;
        return (
            <div id="content">
                <div className="header">
                    <h1>Trending {type[0].toUpperCase() + type.substring(1)}</h1>
                    <div id="search-container">
                        <label htmlFor="search" className="search">Filter </label>
                        <input type="text" id="search" placeholder="Enter your query here" value={this.state.query} onChange={this.handleQuery} />
                    </div>
                </div>

                <div className="group-card">{this.renderContent(this.state[type].data)}</div>

                <Loading isLoading={loading} />

                { this.state[type].data.length 
                    ? (
                        <button type="button" disabled={loading} onClick={this.nextPage} className="more-button">Show More</button>
                      )
                    : (
                        <div />
                      )
                }
            </div>
        )
    }
}

export default Content;