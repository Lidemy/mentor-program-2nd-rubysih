import React, { Component } from 'react';
// import "./the-big-picture.css";

class Home extends Component {
    render() {
        return (
            <div className="home">
                <header className="masthead text-center text-white d-flex">
                    <div className="container my-auto">
                        <div className="row">
                        <div className="col-lg-10 mx-auto">
                            <h1 className="text-uppercase">
                            <strong>A React SPA Blog</strong>
                            </h1>
                            <hr/>
                        </div>
                        <div className="col-lg-8 mx-auto">
                            <p className="text-faded mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt voluptates rerum eveniet sapiente repellat esse, doloremque quod recusandae deleniti nostrum assumenda vel beatae sed aut modi nesciunt porro quisquam voluptatem.</p>
                            <a className="btn btn-primary btn-xl js-scroll-trigger" href="#about">Find Out More</a>
                        </div>
                        </div>
                    </div>
                </header>

                <section className="bg-primary" id="about">
                    <div className="container">
                        <div className="row">
                        <div className="col-lg-8 mx-auto text-center">
                            <h2 className="section-heading text-white">We've got what you need!</h2>
                            <hr className="light my-4"/>
                            <p className="text-faded mb-4">Start Bootstrap has everything you need to get your new website up and running in no time! All of the templates and themes on Start Bootstrap are open source, free to download, and easy to use. No strings attached!</p>
                            <a className="btn btn-light btn-xl js-scroll-trigger" href="#services">Get Started!</a>
                        </div>
                        </div>
                    </div>
                    </section>

                    <section id="services">
                    <div className="container">
                        <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2 className="section-heading">At Your Service</h2>
                            <hr className="my-4"/>
                        </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row ml-5 mr-5">
                        <div className="col-lg-4 col-md-12 text-center">
                            <div className="service-box mt-5 mx-auto">
                            <i className="fa fa-4x fa-paper-plane text-primary mb-3 sr-icon-2"></i>
                            <h3 className="mb-3">Ready to Ship</h3>
                            <p className="text-muted mb-0">You can use this theme as is, or you can make changes!</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 text-center">
                            <div className="service-box mt-5 mx-auto">
                            <i className="fa fa-4x fa-code text-primary mb-3 sr-icon-3"></i>
                            <h3 className="mb-3">Up to Date</h3>
                            <p className="text-muted mb-0">We update dependencies to keep things fresh.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 text-center">
                            <div className="service-box mt-5 mx-auto">
                            <i className="fa fa-4x fa-heart text-primary mb-3 sr-icon-4"></i>
                            <h3 className="mb-3">Made with Love</h3>
                            <p className="text-muted mb-0">You have to make your websites with love these days!</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>

              
                <section id="contact">
                    <div className="container">
                        <div className="row">
                        <div className="col-lg-8 mx-auto text-center">
                            <h2 className="section-heading">Let's Get In Touch!</h2>
                            <hr className="my-4"/>
                            <p className="mb-5">Ready to start your next project with us? That's great! Give us a call or send us an email and we will get back to you as soon as possible!</p>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-lg-4 ml-auto text-center">
                            <i className="fa fa-phone fa-3x mb-3 sr-contact-1"></i>
                            <p>123-456-6789</p>
                        </div>
                        <div className="col-lg-4 mr-auto text-center">
                            <i className="fa fa-envelope fa-3x mb-3 sr-contact-2"></i>
                            <p>
                            <a href="mailto:your-email@your-domain.com">feedback@feedback.com</a>
                            </p>
                        </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Home;
