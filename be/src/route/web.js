import express from "express";
import userController from "../controller/UserController";
import documentController from "../controller/DocumentController";
import classifyController from "../controller/ClassifyController";
import classesController from "../controller/ClassesController";
import weekdayController from "../controller/WeekdayController";
import typeController from "../controller/TypeController";
import courseController from "../controller/CourseController";
import consultController from "../controller/ConsultController";
import registrationController from "../controller/RegistrationController";
import discountController from "../controller/DiscountController";
import pointController from "../controller/PointController";
import reviewController from "../controller/ReviewController";
import outstandingController from "../controller/OutstandingController";
import dashboardController from "../controller/DashboardController";

let router = express.Router();

let initWebRotes = (app) => {
    router.get("/", (req, res) => {
        res.send("Backend LVTN Web");
    });
    //NGƯỜI DÙNG
    router.post("/create-user", userController.create_User);
    router.post("/create-useradmin", userController.create_UserAdmin);
    router.get("/getall-user", userController.getAll_User);
    router.post("/find-user", userController.find_User);
    router.delete("/delete-user/:id", userController.delete_User);
    router.put("/update-user", userController.update_User);
    router.post("/getByType-user", userController.getAll_ByType);
    router.post("/getUser-by", userController.getUser_By);
    router.post("/login", userController.login_User);
    router.post("/forget-password", userController.forget_Password);
    router.put("/changePassword", userController.changePass_User);
    router.put("/changePasswordForget", userController.changePassForget_User);
    router.post("/find-userbyid", userController.find_UserById);
    router.post("/update-active", userController.update_Active);
    router.post("/student-res", userController.student_Res);
    router.post("/findbytypeuser", userController.find_ByTypeUser);

    //TÀI LIỆU
    router.post("/create-document", documentController.create_Document);
    router.get("/getall-document", documentController.getAll_Document);
    router.post("/find-document", documentController.find_Document);
    router.delete("/delete-document/:id", documentController.delete_Document);
    router.put("/update-document", documentController.update_Document);
    router.post("/getall-documentbytype", documentController.getAll_DocumentByType);
    router.post("/find-documentfulltext", documentController.find_DocumentFullText);
    router.post("/increase-dol", documentController.upload_Dol);

    //ĐỐI TƯỢNG
    router.post("/create-classify", classifyController.create_Classify);
    router.get("/getall-classify", classifyController.getAll_Classify);
    router.delete("/delete-classify/:id", classifyController.delete_Classify);
    router.put("/update-classify", classifyController.update_Classify);

    //LỚP HỌC
    router.post("/create-classes", classesController.create_Classes);
    router.get("/getall-classes", classesController.getAll_Classes);
    router.delete("/delete-classes/:id", classesController.delete_Classes);
    router.put("/update-classes", classesController.update_Classes);
    router.post("/find-infoclasses", classesController.find_InfoClasses);
    router.post("/get-liststudentclasses", classesController.get_ListStudentClasses);
    router.post("/send-emailcalender", classesController.send_EmailCalender);
    router.post("/getall-classesteacher", classesController.getAll_ByTeacher);
    router.post("/move-student", classesController.move_Student);

    
    //NỔI BẬT
    router.post("/create-outstanding", outstandingController.create_Outstanding);
    router.get("/getall-outstanding", outstandingController.getAll_Outstanding);
    router.delete("/delete-outstanding/:id", outstandingController.delete_Outstanding);
    router.put("/update-outstanding", outstandingController.update_Outstanding);

    //THỨ TRONG TUẦN
    router.post("/create-weekday", weekdayController.create_Weekday);
    router.get("/getall-weekday", weekdayController.getAll_Weekday);
    router.delete("/delete-weekday/:id", weekdayController.delete_Weekday);
    router.put("/update-weekday", weekdayController.update_Weekday);

    //LOẠI KHÓA HỌC
    router.post("/create-type", typeController.create_Type);
    router.get("/getall-type", typeController.getAll_Type);
    router.delete("/delete-type/:id", typeController.delete_Type);
    router.put("/update-type", typeController.update_Type);

    //KHÓA HỌC
    router.post("/create-course", courseController.create_Course);
    router.get("/getall-course", courseController.getAll_Course);
    router.post("/find-course", courseController.find_Course);
    router.delete("/delete-course/:id", courseController.delete_Course);
    router.put("/update-course", courseController.update_Course);
    router.post("/getby-course", courseController.getBy_Course);
    router.post("/getby-coursebelongtype", courseController.get_CourseBelongType);

    //TƯ VẤN ĐĂNG KÝ
    router.post("/create-consult", consultController.create_Consult);
    router.post("/getall-consult", consultController.getAll_Consult);
    router.post("/accept-consult", consultController.accept_Consult);
    router.post("/accept-resconsult", consultController.accept_ResConsult);

    router.get("/datewait-consult", consultController.dateWait_Consult);
    router.post("/checkstaff-consult", consultController.get_CheckStaffConsult);
    router.put("/update-consult", consultController.update_Consult);
    //PHIẾU ĐĂNG KÝ
    router.post("/create-registration", registrationController.create_Registration);
    router.get("/getall-registration", registrationController.getAll_Registration);
    router.get("/find-registration", registrationController.find_Registration);
    router.put("/update-registration", registrationController.update_Registration);
    router.post("/getby-courseres", registrationController.getBy_CourseRes);
    router.post("/accept-payment", registrationController.accept_Payment);
    router.post("/get-registrationby", registrationController.get_RegistrationBy);
    router.post("/send-mailregis", registrationController.send_MailRegis);
    router.post("/check-classescourse", registrationController.check_ClassesCourse);
    router.post("/check-classes", registrationController.check_Classes);

    //PHIẾU KHUYẾN MÃI
    router.post("/create-discount", discountController.create_Discount);
    router.get("/getall-discount", discountController.getAll_Discount);
    router.get("/getall-discountactive", discountController.getAll_DiscountActive);
    router.get("/find-discount", discountController.find_Discount);
    router.delete("/delete-discount/:id", discountController.delete_Discount);
    router.put("/update-discount", discountController.update_Discount);

    //ĐIỂM
    router.post("/create-point", pointController.create_Point);
    router.get("/getall-point", pointController.getAll_Point);
    router.delete("/delete-point/:id", pointController.delete_Point);
    router.put("/update-point", pointController.update_Point);
    router.post("/getby-point", pointController.find_Point);
    router.post("/getlist-pointclass", pointController.get_ListPointClass);
    router.post("/find-pointstudent", pointController.find_PointStudent);
    router.post("/send-mailpoint", pointController.send_MailPoint);

    //ĐÁNH GIÁ
    router.get("/getall-review", reviewController.getAll_Review);
    router.delete("/delete-review/:id", reviewController.delete_Review);
    router.put("/update-review", reviewController.update_Review);
    router.post("/create-review", reviewController.create_Review);
    router.get("/get-review", reviewController.get_Review);

    //Dashboard
    router.get("/getall", dashboardController.getAll);

    return app.use("/", router);
};

export default initWebRotes;
