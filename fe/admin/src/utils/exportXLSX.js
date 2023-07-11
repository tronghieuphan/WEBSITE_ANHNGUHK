import { utils, writeFile } from "xlsx";

const handleOnExport = (data) => {
    var wb = utils.book_new(),
        ws = utils.json_to_sheet(data.list);
    utils.book_append_sheet(wb, ws, "Mysheet");
    writeFile(wb, `${data.name}.xlsx`);
};

export default handleOnExport;
