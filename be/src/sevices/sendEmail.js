require("dotenv").config();
import nodemailer from "nodemailer";

let sendPassEmail = async (dataSend) => {
    console.log(dataSend);
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORRD,
        },
    });

    let info = await transporter.sendMail({
        from: '"Anh Ngữ HK" <hkeducation.090801@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "THÔNG BÁO ANH NGỮ HK", // Subject line
        html: `
        <div style="width: 100%">
        <div
            style="
                width: 50%;
                border: 1px solid black;
                border-radius: 10px;
                display: block;
                margin: 0px auto;
            "
        >
            <img
                src="https://res.cloudinary.com/dt2bxtoc3/image/upload/v1685297009/img-web/logo_rba9o7.png"
                style="
                    width: 150px;
                    height: 70px;
                    margin: 20px auto;
                    display: block;
                "
                alt=""
            />
            <hr style="width: 60%; margin: 0px auto"   />
            <div style=" padding: 20px 40px">
                <p style="font-style: italic ">Xin chào <span style="font-weight:bold; font-style:italic">${dataSend.lastName} </span> !</p>
                <p>
                    Chúng tôi rất vui khi bạn đến với trung tâm. <br />
                    Đây là mật khẩu của bạn:
                </p>
                <div
                    style="
                        border: 1px black dashed ;
                        padding: 20px 40px;
                        width: fit-content;
                        margin: 0px auto;
                        display: block;
                    "
                >
                    <div
                        style="
                            letter-pacing:2px;
                            font-size: 30px;
                            text-align: center;
                            font-weight: bold;
                        "
                    >
                    ${dataSend.passWord}
                    </div>
                </div>
                <div style="font-style:"italic">Để bảo đảm tính bảo mật bạn vui lòng đổi lại mật khẩu cá nhân của mình.</div>
                <p style=" font-weight: bold; font-style: italic; font-size: 15px ">
                    Trân trọng !
                </p>
                <p style=" font-weight: bold; font-style: italic; font-size: 10px ">
                    TRUNG TÂM ANH NGỮ HKEDU - Với chúng tôi thành công là tất cả !
                </p>
            </div>
        </div>
    </div>
        `,
    });
};

let sendConsultRes = async (dataSend) => {
    console.log(dataSend.email);
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORRD,
        },
    });

    let info = await transporter.sendMail({
        from: '"Anh Ngữ HK" <hkeducation.090801@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "XÁC NHẬN ĐĂNG KÝ TƯ VẤN KHÓA HỌC", // Subject line
        html: `
        <div style="width: 100%">
        <div
            style="
                width: 100%;
                border: 1px solid black;
                border-radius: 10px;
                display: block;
                margin: 0px auto;
            "
        >
            <img
                src="https://res.cloudinary.com/dt2bxtoc3/image/upload/v1685297009/img-web/logo_rba9o7.png"
                style="
                    width: 150px;
                    height: 70px;
                    margin: 20px auto;
                    display: block;
                "
                alt=""
            />
            <hr style="width: 90%; margin: 0px auto"   />
            <div style=" padding: 20px 40px">
                <p style="font-style: italic ">Xin chào <span style="font-weight:bold; font-style:italic"> 
                ${dataSend.fullname}</span> !</p>
                <p>
                    Chúng tôi rất vui khi bạn đã tin tưởng trung tâm chúng tôi !<br />
                    
                </p>
                <div
                    style="
                        width: fit-content;
                        display: block;
                        line-height:30px
                    "
                >
                   Chúng tôi xin gửi thông tin lịch hẹn của bạn: <br>
                     <hr style="border-top: 1px dashed black">
                   <div>
                   <span>Họ và tên: <span style="font-weight:bold; font-style:italic">${dataSend.fullname}</span></span><br>
                   <span>Mục tiêu: <span style="font-weight:bold"> ${dataSend.target}</span></span><br>
                   <span>Thời gian mong muốn: <span style="font-weight:bold"> ${dataSend.timeComplete}</span></span><br>
                   <span>Khóa học đăng ký: <span style="font-weight:bold"> ${dataSend.classes}</span></span><br>
                   <span>Ngày bạn có hẹn với trung tâm: <span style="font-weight:bold"> ${dataSend.dateArrive}</span></span><br>
                   <span>Vào lúc: <span style="font-weight:bold"> ${dataSend.timeArrive}</span></span><br>

<hr style="border-top: 1px dashed black">                   
<p>Trung tâm hẹn bạn sớm đến trung tâm để được tư vấn nhanh chóng và tiến hành đăng ký khóa học.
                 <br>  <span style="font-style:italic">Thời gian tiếp học viên:<br> <ul><li style="font-weight:bold; color:red">8:00 AM - 9:00 PM</li></ul>


                   </div>
                </div>
                <p style=" font-weight: bold; font-style: italic; font-size: 15px ">
                    Trân trọng !
                </p>
                <p style=" font-weight: bold; font-style: italic; font-size: 10px ">
                    TRUNG TÂM ANH NGỮ HKEDU - Với chúng tôi thành công là tất cả !
                </p>
            </div>
        </div>
    </div>

        `,
    });
};
let sendForgetPassword = async (dataSend) => {
    console.log(dataSend.email);
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORRD,
        },
    });

    let info = await transporter.sendMail({
        from: '"Anh Ngữ HK" <hkeducation.090801@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "HK EDU GỬI MÃ XÁC NHẬN QUÊN MẬT KHẨU", // Subject line
        html: `
        <div style="width: 80%">
        <div
            style="
                width: 100%;
                border: 1px solid black;
                border-radius: 10px;
                display: block;
                margin: 0px auto;
            "
        >
            <img
                src="https://res.cloudinary.com/dt2bxtoc3/image/upload/v1685297009/img-web/logo_rba9o7.png"
                style="
                    width: 150px;
                    height: 70px;
                    margin: 20px auto;
                    display: block;
                "
                alt=""
            />
            <hr style="width: 90%; margin: 0px auto"   />
            <div style=" padding: 2% 6%">
                <p style="font-style: italic ; font-size:18px">Xin chào <span style="font-weight:bold; font-style:italic; font-size:18px"> 
                ${dataSend.fullname}</span> !</p>
         
                <div
                    style="
                        width: fit-content;
                        display: block;
                        line-height:30px;
                        font-size:18px

                    "
                >
                   Chúng tôi xin gửi bạn mã xác nhận email: <br>
                   
                   
                   </div>
               <div style="margin:5%">
                  <div style="font-weight:bold; border:1px solid black; width:80%; display:block;margin:auto; text-align:center; padding:2% 4%; letter-spacing:10px; font-size:30px">
                   ${dataSend.code}
                   </div>

                   </div>
                </div>
               <div>
               <p style="padding-left:6%; font-weight:bold; font-style:italic;font-size:18px">Trận trọng !</p>
               </div>
            </div>
        </div>
    </div>

        `,
    });
};
let sendRegistation = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORRD,
        },
    });
    let info = await transporter.sendMail({
        from: '"Anh Ngữ HK" <hkeducation.090801@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "THÔNG BÁO PHIẾU ĐĂNG KÝ KHÓA HỌC", // Subject line
        html: `
        <div style="width: 100%">
        <img src="${dataSend.image}" style="width:100%"/>
       </div>
        `,
    });
};
let sendUpdateUser = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORRD,
        },
    });
    let info = await transporter.sendMail({
        from: '"Anh Ngữ HK" <hkeducation.090801@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "THÔNG BÁO PHIẾU ĐĂNG KÝ KHÓA HỌC", // Subject line
        html: `
        <div style="width: 80%">
        <div
            style="
                width: 100%;
                border: 1px solid black;
                border-radius: 10px;
                display: block;
                margin: 0px auto;
            "
        >
            <img
                src="https://res.cloudinary.com/dt2bxtoc3/image/upload/v1685297009/img-web/logo_rba9o7.png"
                style="
                    width: 150px;
                    height: 70px;
                    margin: 20px auto;
                    display: block;
                "
                alt=""
            />
            <hr style="width: 90%; margin: 0px auto"   />
            <div style=" padding: 2% 6%">
                <p style="font-style: italic ">Xin chào <span style="font-weight:bold; font-style:italic"> 
                ${dataSend.fullname}</span> !</p>
                <div
                    style="
                        width: fit-content;
                        display: block;
                        line-height:30px
                    "
                >
                   Chúng tôi xin thông báo tài khoản của bạn đã được <span style="font-weight:bold; color:red; font-style:italic ; font-size:15px"> nâng cấp </span> lên <span style="font-weight:bold; color:red;font-style:italic; font-size:15px"> tài khoản học viên</span>.
                   </div>
               <div style="margin:5%">
                  <div style="border:1px solid black;border-radius:20px; width:60%; display:block;margin:auto; text-align:center;font-weight:bold;  font-style:italic; padding:2% 4%; letter-spacing:5px; font-size:25px; background-color:#FBFF81">
                  XIN CHÚC MỪNG
                   </div>

                   </div>
                </div>
               <div style="padding-left:6%; font-style:italic"> Chúc bạn sẽ có những trãi nghiệm tuyệt vời tại trung tâm của chúng tôi.</div>
               <p style="padding-left:6%; font-weight:bold; font-style:italic">Trận trọng !</p>
               </div>
            </div>
        </div>
    </div>
        `,
    });
};

let sendCalenderClass = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORRD,
        },
    });
    let info = await transporter.sendMail({
        from: '"Anh Ngữ HK" <hkeducation.090801@gmail.com>', // sender address
        to: dataSend.list, // list of receivers
        subject: "THÔNG BÁO PHIẾU ĐĂNG KÝ KHÓA HỌC", // Subject line
        html: `
        <div
        style="
            width: 100%;
            border: 1px solid black;
            border-radius: 10px;
            display: block;
            margin: 0px auto;
        "
    >
        <img
            src="https://res.cloudinary.com/dt2bxtoc3/image/upload/v1685297009/img-web/logo_rba9o7.png"
            style="
                width: 150px;
                height: 70px;
                margin: 20px auto;
                display: block;
            "
            alt=""
        />
        <hr style="width: 90%; margin: 0px auto"   />
        <div style="text-align:center; margin:10px; font-size:20px; font-weight:bold; color:red;font-style:italic">THÔNG BÁO THỜI KHÓA BIỂU</div>
        <div style=" padding: 0 6%">
           
            <div
                style="
                    width: fit-content;
                    display: block;
                    line-height:30px
                "
            >
               Chúng tôi xin thông báo thời khóa biểu của khóa học ${dataSend.nameClasses}
               </div>
         <ul>
         <li>Thứ: <span style="color:red; font-weight:bold">${dataSend.day}</span> </li>
         <li>Thời gian bắt đầu: <span style="color:red; font-weight:bold">${dataSend.startHour}</span></li>
         <li>Thời gian kết thúc:<span style=" font-weight:bold">${dataSend.endHour}</span> </li>
         <li>Ngày bắt đầu:<span style="color:red; font-weight:bold">${dataSend.startDate}</span> </li>
         <li>Ngày kết thúc:<span style=" font-weight:bold">${dataSend.endDate}</span> </li>
         </ul>
         </div>
           <div style="padding-left:6%; font-style:italic"> Chúc bạn sẽ có những trãi nghiệm tuyệt vời tại trung tâm của chúng tôi.</div>
           <p style="padding-left:6%; font-weight:bold; font-style:italic">Trận trọng !</p>
           </div>
    

        `,
    });
};

module.exports = {
    sendPassEmail,
    sendConsultRes,
    sendRegistation,
    sendForgetPassword,
    sendUpdateUser,
    sendCalenderClass,
};
