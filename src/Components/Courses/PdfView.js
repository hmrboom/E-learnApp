import React, {Component} from 'react';
import PDF from 'react-pdf-js';
class PdfView extends Component {
    constructor(props) {
        super(props);
        this.onDocumentComplete = this.onDocumentComplete.bind(this);
        this.onPageCompleted = this.onPageCompleted.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.state = {
            page: 0
        };
        this.state = {
            pages: 0
        };
    }

    onDocumentComplete(pages) {
        this.setState({ page: 1, pages });
    }

    onPageCompleted(page) {
        this.setState({ page });
    }

    handlePrevious() {
        this.setState({ page: this.state.page - 1 });
    }

    handleNext() {
        this.setState({ page: this.state.page + 1 });
    }

    renderPagination(page, pages) {
        let previousButton = <li className="previous" onClick={this.handlePrevious}><div style={{ fontSize:18,cursor:'pointer' }}><i className="fa fa-arrow-left"></i> Previous</div></li>;
        if (page === 1) {
            previousButton = <li className="previous disabled"><div style={{ fontSize:18,cursor:'pointer' }}><i className="fa fa-arrow-left"></i> Previous</div></li>;
        }
        let nextButton = <li className="next" onClick={this.handleNext}><div style={{ fontSize:18,cursor:'pointer' }}>Next <i className="fa fa-arrow-right"></i></div></li>;
        if (page === pages) {
            nextButton = <li className="next disabled"><div style={{ fontSize:18,cursor:'pointer' }}>Next <i className="fa fa-arrow-right"></i></div></li>;
        }
        return (
            <nav>
                <ul className="pager" style={{ display:'flex',gap:50,justifyContent: 'center'}}>
                    {previousButton}
                    {nextButton}
                </ul>
            </nav>
        );
    }

    render() {
        let pagination = null;
         if (this.state.pages) {
            pagination = this.renderPagination(this.state.page, this.state.pages);
         }
        return (
            <div style={{ display:'flex',justifyContent: 'center',flexDirection:'column',marginBottom:10}}>

                     <PDF scale={0.85} file={this.props.file} onDocumentComplete={this.onDocumentComplete} onPageCompleted={this.onPageCompleted} page={this.state.page} />

                <div>
                    {pagination}
                </div>
            </div>
        );
    }
}

export default PdfView;
