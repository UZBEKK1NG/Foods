import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoFastFoodSharp, IoCloseCircle } from "react-icons/io5";
import { FoodsProps } from "./Type";

const App = () => {
  let [foods, setFoods] = useState<FoodsProps[]>([]);
  let [selectFood, setSelectFood] = useState<FoodsProps | undefined>();

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/search.php?s=beef")
      .then((data) => setFoods(data.data.meals))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div>
      <nav className="h-[10vh] bg-purple-800 text-white flex justify-between items-center px-10">
        <IoFastFoodSharp className="text-4xl cursor-pointer" />
        <div className="flex gap-10">
          <input
            type="search"
            className="bg-transparent border-2 p-2 rounded-sm placeholder:text-white text-white border-white"
            placeholder="Enter title"
            id=""
          />
          <input
            type="search"
            className="bg-transparent border-2 p-2 rounded-sm placeholder:text-white text-white border-white"
            placeholder="Enter Region"
            id=""
          />
        </div>
      </nav>
      <div className="w-11/12 my-5 mx-auto grid grid-cols-3 gap-4">
        {foods?.map((item, index) => (
          <div
            key={index}
            className="shadow-md cursor-pointer duration-300 hover:shadow-slate-800 rounded-md shadow-slate-500 p-5"
            onClick={() => setSelectFood(item)}
          >
            <img src={item.strMealThumb} alt={item.strMeal} />
            <h3 className="text-xl mt-2">
              <b>Title: </b> {item.strMeal}
            </h3>
            <div className="my-2 flex justify-between">
              <p>
                <b>Category: </b>
                {item.strCategory}
              </p>
              <p>
                <b>Area: </b> {item.strArea}
              </p>
            </div>
          </div>
        ))}
      </div>
      {selectFood && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white shadow-md shadow-orange-700 p-5 rounded-md w-[80vw] h-[80vh] overflow-auto relative">
            <IoCloseCircle
              className="absolute top-2 right-2 text-3xl text-purple-800 cursor-pointer"
              onClick={() => setSelectFood(undefined)}
            />
            <h4 className="text-2xl font-bold mb-4">{selectFood.strMeal}</h4>
            <p className="mb-4">{selectFood.strInstructions}</p>
            <iframe
              className="w-full aspect-video"
              src={`https://www.youtube.com/embed/${selectFood.strYoutube?.slice(32)}`}
              title={selectFood.strMeal}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;
