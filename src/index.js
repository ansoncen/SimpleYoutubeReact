import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'
import _ from 'lodash';

const API_KEY = 'AIzaSyCgPu0ZmO7kLRAGbg9kmsC5rh6q47_k3TQ';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null,
        };

        this.videoSearch('surface');
    }

    videoSearch(term){
        YTSearch({key:API_KEY, term:term}, (data) => {
            this.setState({
                videos: data,
                selectedVideo: data[0],
            });
        });
    }

    render(){
        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

        return(
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            </div>
        );
    }

}


ReactDOM.render(<App />, document.querySelector('.container'));
