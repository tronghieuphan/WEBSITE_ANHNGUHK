import { Input } from "antd";
const { Search } = Input;

function SearchData(props) {
    const { setDataFind } = props;
    const onSearch = (value) => {
        setDataFind(value);
    };
    return (
        <Search
            placeholder="Tìm kiếm...."
            onSearch={onSearch}
            style={{
                width: 300,
            }}
        />
    );
}
export default SearchData;
