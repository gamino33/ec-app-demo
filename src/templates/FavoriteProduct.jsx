import { List } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import {getFavoriteProducts} from "../reducks/users/selectors"
import {CartListItem} from "../components/Products"
import {makeStyles} from "@material-ui/styles"

const useStyles = makeStyles( {
    root:{
        margin: "0 auto",
        maxWidth: 512,
        width: "100%"
    }
})


const FavoriteProduct = () => {
    const classes = useStyles();

    const selector = useSelector((state) => state);
    const favoriteProducts = getFavoriteProducts(selector);

    return (
        <section className="c-section-wrapin">
            <h2 className="u-text__headline">
                お気に入り商品リスト
            </h2>
            <List className={classes.root}>
                {favoriteProducts.length > 0 &&
                    favoriteProducts.map(favoriteProduct => (
                        <CartListItem key={favoriteProduct.favoriteId} product={favoriteProduct} id={favoriteProduct.favoriteId} target={"favorite"} />
                    ))
                }
            </List>
        </section>
    )
}

export default FavoriteProduct;
