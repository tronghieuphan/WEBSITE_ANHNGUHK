import "./style.scss";
function TitlePage(props) {
    let data=props.data;
    
    return (
        <>
            <div className=" w-100 banner-search">
                <div className="row d-flex flex-wrap">
                    <div className=" col-md-7 title-banner">
                        <div>
                            <span className="title-1">
                                {data.label} <span className="title-2">{data.style}</span>
                            </span>

                            <br />
                        </div>
                    </div>
                    <div className=" col-md-5 text-end image-banner">
                        <img src={data.img} alt="" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default TitlePage;
