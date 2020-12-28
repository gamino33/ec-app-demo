import { List } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {getFavoriteProducts} from "../reducks/users/selectors"

const FavoriteProduct = () => {

    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const favoriteProducts = getFavoriteProducts(selector);

    return (
        <section className="c-section-wrapin">
            <h2>
                お気に入り商品リスト
            </h2>
            {/* <List>
                {favoriteProducts > 0 &&
                    favoriteProducts.map(favoriteProduct => (
                        {favoriteProduct}
                    ))
                }
            </List> */}
        </section>
    )
}

export default FavoriteProduct;
