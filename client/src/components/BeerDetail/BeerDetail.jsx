/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBeerDetail, removeDetail } from "../../redux/actions/index";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import style from '../BeerDetail/BeerDetail.module.css'
import NavBar from "../NavBar/NavBar";

export default function BeerDetail(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const beer = useSelector((state) => state.detail);
  console.log(beer);

  useEffect(() => {
    dispatch(removeDetail());
    dispatch(getBeerDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className={style.detailPage}>
        {beer.length === 0 ? (
          <div>
            (<Loading setLoading={setLoading} />)
          </div>
        ) : (
          <div>
            <div>
              <Link to="/home">
                <button className={style.button}>Back</button>
              </Link>
            </div>
            <div className={style.box}>
              <div className={style.leftContainer}>
                <div>
                  <h1>{beer.name}</h1>
                </div>
                <div>
                  <img src={beer.image} alt="" />
                </div>
              </div>
              <div className={style.containerR}>
                <p>
                  <strong>Description: </strong>
                  <span className={style.textBox}>{beer.description}</span>
                </p>
                <p>
                  <strong>Price: </strong>
                  <span className={style.textBox}>{beer.price}</span>
                </p>
                <p>
                  <strong>Stock: </strong>
                  <span className={style.textBox}>{beer.stock}</span>
                  
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
