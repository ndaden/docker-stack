import React from 'react';

const ArticleDefault = () => {
    return (
        <div className="card article main">
            <div className="card-content">
                <div className="media">
                    <div className="media-center">
                        <img src="http://www.radfaces.com/images/avatars/daria-morgendorffer.jpg" className="author-image" alt="Placeholder" />
                    </div>
                    <div className="media-content has-text-centered">
                        <p className="title article-title has-text-weight-light">Introducing a new feature for paid subscribers</p>
                        <div className="tags has-addons level-item">
                            <span className="tag is-rounded is-info">@skeetskeet</span>
                            <span className="tag is-rounded">May 10, 2018</span>
                        </div>
                    </div>
                </div>
                <div className="content article-body">
                    <p>Non arcu risus quis varius quam quisque. Dictum varius duis at consectetur lorem. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper. </p>
                    <p>Metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices.
                    In hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit.
                    Accumsan lacus vel facilisis volutpat. Non sodales neque sodales ut etiam.
                    Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus.
                    </p>
                    <h3 className="has-text-centered">How to properly center tags in bulma?</h3>
                    <p> Proper centering of tags in bulma is done with class: <pre>level-item</pre>
                                Voluptat ut farmacium tellus in metus vulputate. Feugiat in fermentum posuere urna nec. Pharetra convallis posuere morbi leo urna molestie.
                                Accumsan lacus vel facilisis volutpat est velit egestas. Fermentum leo vel orci porta. Faucibus interdum posuere lorem ipsum.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ArticleDefault;
