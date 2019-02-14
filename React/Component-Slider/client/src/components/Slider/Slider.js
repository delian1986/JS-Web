import React from 'react';
import fetcher from '../../fetcher';

const EPISODE_ENDPOINT='/episodePreview/'

export default class Slider extends React.Component {
    constructor(props){
        super(props)
        this.state={
            url:null,
            id:null
        }
    }

    fetchEpisode=id=>{
        fetcher.get(EPISODE_ENDPOINT+id,data=>this.setState(data))
    }

    componentDidMount=()=>{
        this.fetchEpisode(0)
    }

    prevEpisode=()=>{
        fetcher.get(EPISODE_ENDPOINT+Number(this.state.id-1),data=>{
            this.setState(data)
        })
    }

    nextEpisode=()=>{
        fetcher.get(EPISODE_ENDPOINT+Number(this.state.id+1),data=>{
            this.setState(data)
        })
    }

    render = () => (
            <section id="slider">
            {/* prev episode */}
                <img 
                className="button" 
                src="/left.png" 
                title="previous" 
                alt="nav" 
                onClick={this.prevEpisode}
                />

                {/* center current image */}
                <div className="image-container">
                    <img src={this.state.url} alt="episode" />
                </div>

                {/* next episode */}
                <img 
                className="button" 
                src="/right.png" 
                title="next" 
                alt="nav" 
                onClick={this.nextEpisode}
                />
            </section>
        );
}