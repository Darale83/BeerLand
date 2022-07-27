/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import style from "../BeerCard/BeerCard.module.css";

import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

import Swal from "sweetalert2";

export default function BeerCard({
  id,
  name,
  price,
  image,
  // type,
  // origin,
}) {
  return (
    <Link to={`/beers/detail/${id}`}>
      <div className={style.cardContainer}>
        <h2>{name}</h2>
        <img className={style.cardImg} src={image} alt="No img found :(" />
        <h4>Price: $ {price}</h4>
        {/* <h4 className={style.content}>{type}</h4>
        <h4 className={style.content}>{origin}</h4> */}
      </div>
    </Link>
  );
}
