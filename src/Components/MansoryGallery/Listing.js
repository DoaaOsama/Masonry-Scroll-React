import React, { Component } from 'react';
import MasonryLayout from 'react-masonry-layout';
import axios from 'axios';
import './mansory.scss';
import MansoryCard from './Card';
import loader from '../../Assets/Images/loading.gif'


class MansoryListing extends Component {

    constructor(props) {
        super(props);

        this.state = {
            endPosition: 0,
            data: [],
            currentItems: [],
            loading: true,
            input: '',
            infiniteScrollEnd: false
        }

        this.watchChange = this.watchChange.bind(this);
        this.loadItems = this.loadItems.bind(this);
    }

    async componentDidMount() {
        try {
            this.setState({ loading: true });
            const Rendereddata = await (axios.get('https://www.amiiboapi.com/api/amiibo/'));
            const data = Rendereddata.data.amiibo;
            this.setState({ data, loading: false }, () => {
                this.setState({
                    currentItems: this.state.data.filter((item, index) => index >= this.state.endPosition && index < this.state.endPosition + 100),
                    endPosition: 100
                })
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    watchChange(event) {
        this.setState({
            input: event.target.value,
        }, () => {
            this.setState({
                currentItems:
                    this.state.data.filter((element) =>
                        (element.name.toLowerCase().includes(this.state.input.toLowerCase()))
                    )
            })
        })
    }

    loadItems() {
        this.setState({
            currentItems: this.state.currentItems.concat(this.state.data.filter((item, index) => index >= this.state.endPosition && index < this.state.endPosition + 100))
        }, () => {
            if (!(this.state.endPosition + 100 > this.state.data.length))
                this.setState({ endPosition: this.state.endPosition + 100 })
            else
                this.setState({
                    infiniteScrollEnd: true
                })
        }
        )
    }



    render() {
        const { loading, currentItems } = this.state;
        console.log(this.state.currentItems)
        if (loading)
            return <img className="loader" src={loader} alt="Loading....." />;
        else
            return (
                <>
                    <input type="text" className="searchBar" placeholder="Search..." onChange={this.watchChange}></input>
                    <MasonryLayout
                        id="masonry-layout"
                        infiniteScroll={this.loadItems}
                        // infiniteScrollLoading={true}
                        infiniteScrollDistance={700}
                        infiniteScrollEnd={this.state.infiniteScrollEnd}
                        sizes={[{ columns: 2, gutter: 20 }, { mq: '600px', columns: 3, gutter: 20 }, { mq: '700px', columns: 4, gutter: 20 }, { mq: '900px', columns: 5, gutter: 20 }, { mq: '1024px', columns: 7, gutter: 12 }]}
                    >
                        {currentItems.map((data, i) =>
                            <MansoryCard key={i} {...data}></MansoryCard>
                        )}
                    </MasonryLayout>
                </>
            )
    }

}

export default MansoryListing;