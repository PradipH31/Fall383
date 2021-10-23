import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Menu.css";
import { specialsData } from "../testData/testData";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { getMenuItems } from "../actions/menuitems";
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

const Menu = () => {
    const [items, setItems] = useState([]);

    const getItems = () => {
        return getMenuItems()
            .then((data) => {
                setItems(data);
                console.log(data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getItems();
    }, []);

    return (
        <div style={{ margin: "10%" }} className="specials">
            <h2 className="specials-title">Today's Menu</h2>
            <Slider prevArrow={<PreviousBtn />}
                nextArrow={<NextBtn />
                }
                slidesToShow={4}
                infinite={false}
                slidesToScroll={2}
            >
                {specialsData.map((item, index) => (
                    <Card key={index} item={item} />
                ))}
            </Slider>
            <br />
            <h2 className="specials-title">Specials this Week</h2>
            {/* <span>
                {JSON.stringify(items)}
            </span> */}
            <Slider prevArrow={<PreviousBtn />}
                nextArrow={<NextBtn />
                }
                slidesToShow={4}
                infinite={false}
                slidesToScroll={2}
            >
                {items.map((item, index) => (
                    <Card key={index} item={item} />
                ))}
            </Slider>
        </div>
    );
};

export default Menu;