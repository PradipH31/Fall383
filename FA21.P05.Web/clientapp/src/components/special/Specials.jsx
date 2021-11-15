import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Specials.css";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { getSpecialItems } from "../actions/menuitems";
import { useEffect, useState } from "react";
import Card from "../card/Card";


const PreviousBtn = (props) => {
    // console.log(props);
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <ArrowBackIos style={{ color: "blue", fontSize: "30px" }} />
        </div>
    );
};
const NextBtn = (props) => {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <ArrowForwardIos style={{ color: "blue", fontSize: "30px" }} />
        </div>
    );
};

const Specials = () => {
    const [specialItems, setSpecialItems] = useState([]);

    const getItems = () => {
        return getSpecialItems()
            .then((data) => {
                setSpecialItems(data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getItems();
    }, []);

    return (
        <div style={{ margin: "10%" }} className="specials">

            <h2 className="specials-title">Specials this Week</h2>
            <Slider prevArrow={<PreviousBtn />}
                nextArrow={<NextBtn />
                }
                slidesToShow={4}
                infinite={false}
                slidesToScroll={2}
            >
                {specialItems.map((item, index) => (
                    <Card key={index} item={item} />
                ))}
            </Slider>
        </div>
    );
};

export default Specials;