import { Input } from "antd";
import { useState, useEffect } from "react";

function SearchData(props) {
    const { Search } = Input;
    const { setDataFind} = props;
  
    const onSearch = (value) => {
        setDataFind(value);
    };
  
    return (
        <Search
            placeholder="Tìm kiếm...."
            onSearch={onSearch}
            name="search"
            style={{
                width: 300,
            }}
        />
    );
}
export default SearchData;
