import React, { useEffect, useState } from "react";
import products from "public/products";
import Image from "next/image";
import axios from "axios";
import Style from "./detail.module.css";
import BackButton from "@/components/BackButton";
import { useRouter } from "next/navigation";
import { useWindowSize } from "@/hooks";

function index({ product }) {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [stockState, setStockState] = useState(product.skus[0].info.stock);
  const [priceState, setPriceState] = useState(product.skus[0].info.price);
  const [isReadMore, setIsReadMore] = useState(false);
  const [imgUrl, setImgUrl] = useState(`/images${product.image}`);

  const windowSize = useWindowSize();

  const handleSelectProduct = (id) => {
    setSelectedProduct(id);
    setPriceState(product.skus[id].info.price);
    setStockState(product.skus[id].info.stock);
  };

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const handleImgError = () => {
    setImgUrl("/images/missing.svg");
  };

  // extraer a api para poder reutilizarla en toda la app
  const addToCart = (id) => {
    let price = product.skus[id].info.price;
    let skuID = product.skus[id].code;
    let productName = product.skus[id].name;

    let finalProduct = {
      id: product.id,
      sku: skuID,
      brand: product.brand,
      price: price,
      name: productName,
    };
  };

  const refreshData = () => {
    //router.replace(router.asPath);
    router.refresh();
  };

  /*   useEffect(() => {
    const interval = setInterval(async () => {
      let res = await axios.get(
        `/api/stock-price/${product.skus[selectedProduct].code}`
      );
      console.log(res.status, "fetch data");
      if (res.status < 300) {
        refreshData();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []); */

  return (
    <div className={Style.mainContainer}>
      <div className={Style.topContainer}>
        <BackButton />
        <p className={`${Style.textBlack} ${Style.subHeaderText}`}>Detail</p>
        <Image src={"/images/dots.svg"} alt="See more" width={40} height={40} />
      </div>

      <div className={Style.sidesContainer}>
        <div className={Style.left}>
          <div className={Style.imgContainer}>
            <Image
              src={imgUrl}
              alt={product.brand}
              width={240}
              height={240}
              style={{ objectFit: "contain" }}
              onError={handleImgError}
            />
          </div>
        </div>
        <div className={Style.right}>
          <div className={Style.brandContainer}>
            <p className={`${Style.textBlack} ${Style.headerText}`}>
              {product.brand}
            </p>
            <p className={`${Style.textPrimary} ${Style.headerText}`}>
              ${priceState / 100}
            </p>
          </div>
          <div className={Style.stockContainer}>
            <p>Origin: {product.origin}</p>
            <p>|</p>
            <p>Stock: {stockState}</p>
          </div>

          <div className={Style.descriptionContainer}>
            <p className={`${Style.textBlack} ${Style.subHeaderText}`}>
              Description
            </p>
            <p style={{ marginTop: "15px", lineHeight: "24px" }}>
              {isReadMore || windowSize.width > 1280
                ? product.information
                : product.information.slice(0, 150)}
              {windowSize.width < 1280 ? (
                <span onClick={toggleReadMore} className={Style.readMoreAction}>
                  {isReadMore ? " show less" : "...Read more"}
                </span>
              ) : null}
            </p>
          </div>
          <div className={Style.sizeContainer}>
            <p className={`${Style.textBlack} ${Style.subHeaderText}`}>Size</p>
            <div className={Style.btnContainer}>
              {product.skus.map((sku, index) => (
                <button
                  key={sku.code}
                  className={
                    selectedProduct == index
                      ? `${Style.btn} ${Style.selected}`
                      : `${Style.btn} ${Style.notSelected}`
                  }
                  onClick={() => handleSelectProduct(index)}
                >
                  {sku.name}
                </button>
              ))}
            </div>
          </div>
          <div className={Style.actionContainer}>
            <button className={Style.bagBtn}>
              <Image
                src={`/images/bag.svg`}
                alt={product.brand}
                width={24}
                height={24}
                style={{ objectFit: "contain" }}
              />
            </button>
            <button
              className={Style.cartBtn}
              onClick={() => addToCart(selectedProduct)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const ID = Number(ctx.query.id);

  const PRODUCT = products.find((p) => p.id === ID);
  let SUBPRODUCTS = [];

  let skus = PRODUCT.skus.map((sku) => {
    return sku;
  });

  for (let i = 0; i < skus.length; i++) {
    await axios
      .get(`${process.env.NEXT_APP_URL}/api/stock-price/${skus[i].code}`)
      .then((r) => {
        SUBPRODUCTS.push(r.data);
        PRODUCT.skus[i].info = r.data.value;
      });
  }

  return {
    props: {
      product: PRODUCT,
    },
  };
}

export default index;
