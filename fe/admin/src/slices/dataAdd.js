import { createSlice } from "@reduxjs/toolkit";

export const dataAddSlice = createSlice({
    name: "dataAdd",
    initialState: {
        weekday: [],
        skill: [],
        classify: [],
        type: [],
        document: [],
        discount: [],
        classes: [],
        point: [],
        user: [],
        outstanding: [],
        registration: [],
        consult: [],
    },
    reducers: {
        setDataWeekday: (state, action) => {
            state.weekday = action.payload;
        },
        setDataSkill: (state, action) => {
            state.skill = action.payload;
        },
        setDataClassify: (state, action) => {
            state.classify = action.payload;
        },
        setDataType: (state, action) => {
            state.type = action.payload;
        },
        setDataDocument: (state, action) => {
            state.document = action.payload;
        },
        setDataReview: (state, action) => {
            state.review = action.payload;
        },
        setDataDiscount: (state, action) => {
            state.discount = action.payload;
        },
        setDataCourse: (state, action) => {
            state.course = action.payload;
        },
        setDataClasses: (state, action) => {
            state.classes = action.payload;
        },
        setDataPoint: (state, action) => {
            state.point = action.payload;
        },
        setDataUser: (state, action) => {
            state.user = action.payload;
        },
        setDataOutstanding: (state, action) => {
            state.outstanding = action.payload;
        },
        setDataRegistration: (state, action) => {
            state.registration = action.payload;
        },
        setDataConsult: (state, action) => {
            state.consult = action.payload;
        },
    },
});
export const {
    setDataWeekday,
    setDataSkill,
    setDataClassify,
    setDataType,
    setDataDocument,
    setDataReview,
    setDataDiscount,
    setDataCourse,
    setDataClasses,
    setDataPoint,
    setDataUser,
    setDataOutstanding,
    setDataRegistration,
    setDataConsult,
} = dataAddSlice.actions;
export default dataAddSlice.reducer;
