import * as React from 'react';

import './index.css';

import { getData } from './service';

import Loading from './LoadingIndicator';

export interface Props {
    match: any
}

interface State {
    anime: Data[],
    drama: Data[],
    loading: boolean,
    manga: Data[],
    type: string,
}

interface Data {
    image: string,
    score: number,
    status: string,
    title: string,
}

const baseUrl: string = 'https://kitsu.io/api/edge/trending/';

class Content extends React.Component<Props, State> {
    constructor (props: Props) {
        super(props);

        const { type } = props.match.params;

        this.state = {
            anime: [],
            drama: [],
            loading: true,
            manga: [],
            type,
        };

        this.processData = this.processData.bind(this);

        getData(baseUrl+type, this.processData);
    }

    public componentWillReceiveProps (nextProps: Props) {
        const { type } = nextProps.match.params;
        let loading: boolean = false;

        if (!this.state[type].length) {
            getData(baseUrl+type, this.processData);
            loading = true;
        }

        this.setState({ type, loading });
    }

    public processData (response: any) {
        const { data } = response.data;
        const processed: Data[] = data.map((datum: any) => {
            const { attributes } = datum;
            const processedDatum: Data = {
                image: attributes.posterImage.small,
                score: Number(attributes.averageRating),
                status: attributes.status,
                title: attributes.titles.en || attributes.titles.en_jp,
            }
            return processedDatum;
        });
        this.setData(processed);
    }

    private setData (data: Data[]) {
        const { type } = this.state;
        switch (type) {
            case 'anime': {
                this.setState({anime: data, loading: false});
                break;
            }
            case 'drama': {
                this.setState({drama: data, loading: false});
                break;
            }
            case 'manga': {
                this.setState({manga: data, loading: false});
                break;
            }
        }
    }

    private renderContent (data: Data[]) {
        if (!data.length && !this.state.loading) {
            return (
                <h2>Whoops, there's no data in this section</h2>
            );
        }
        const content: any = data.map((item: Data, index: number) => (
                        <div className="card" key={index}>
                            <div className="image">
                                <span className="circle">
                                    <p>{item.score}</p>
                                </span>
                                <img src={item.image} alt="" />
                            </div>
                            <p className="title">{
                                item.title.length > 25
                                ? `${item.title.substring(0, 22)}...`
                                : item.title
                            }</p>
                            <p className="subtitle">{item.status}</p>
                        </div>
                    ));
        return content;
    }

    public render () {
        const { type, loading } = this.state;
        return (
            <div id="content">
                <div className="header">
                    <h1>Trending {type[0].toUpperCase() + type.substring(1)}</h1>
                    <div id="search-container">
                        <label htmlFor="search" className="search">Search </label>
                        <input type="text" id="search" placeholder="Cari" />
                    </div>
                </div>

                <div className="group-card">{this.renderContent(this.state[type])}</div>

                <Loading isLoading={loading} />
            </div>
        )
    }
}

export default Content;