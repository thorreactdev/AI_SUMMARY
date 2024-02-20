import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";
import { lazy } from "react";
const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newarticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newarticle, ...allArticles];
      setArticle(newarticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("article", JSON.stringify(updatedAllArticles));
      console.log(newarticle);
    }
  };

  return (
    <section className="mt-16 w-full max-w-xl ">
      {/* search */}
      <div className="flex flex-col gap-2 w-full">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="Link-Icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />

          <input
            type="url"
            placeholder="Enter The Link.."
            value={article.url}
            onChange={(e) =>
              setArticle({
                ...article,
                url: e.target.value,
              })
            }
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn
           peer-focus:border-gray-700
          peer-focus:text-green-700"
          >
            ⮞
          </button>
        </form>
        <div className="flex flex-col gap-1 max-h-70 overflow-y-auto">
         
          {allArticles.map((item,index)=>(
            <div
            key={`link-${index}`}
            onClick={()=>setArticle(item)}
            className="link_card"
            >
              <div className="copy_btn">
                <img src={copy} alt="justImage"
                className="w-[40%] h-[40%] object-contain"
                
                
                />

              </div>
              <p className="text-sm flex-1 truncate text-blue-700 font-medium">
                {item.url}
              </p>


            </div>

          ))}
          
           
        </div>
      </div>

      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader"
          className="w-20 h-20 object-contain"/>
        ):error ?(
          <p className="font-inter font-bold text-black text-center">
            Well That wasn't suppose to happen
            <br/>
            <span>
              {error?.data?.error}
            </span>
          </p>
        ):(
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl text-center">
                Article <span className="blue_gradient">Summary</span>
              </h2>

              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">{article.summary}</p>
              </div>

            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
