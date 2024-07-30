import error404Image from '../../assets/images/error404.jpg';

const error404 = () => {
    return (

        <main>
            <h1>404: PAGE NOT FOUND</h1>
            <p>this page is taking a break🍙</p>
            <img src={error404Image} alt="odin napping" />
        </main>

    )
};

export default error404;