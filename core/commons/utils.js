const _ = require("lodash");
const uuid = require('uuid');
let service = {};
service.clone = (o) => {
    if (typeof o === "object") {
        return _.clone(o)
    } else {
        return o;
    }
};
service.titleCase = (str) => {
    return _.startCase(_.toLower(str));
};
service.getUniqueId = () => {
    return uuid.v1();
};
service.isEmail = (email) => {
    email = email || "";
    var regex = /^[\w\.=-]+@[\w\.-]+\.[\w]{2,3}$/
    return regex.test(email);
}
service.isMobile = (mobile) => {
    mobile = mobile || "";
    var regex = /^[987]\d{9}$/
    return regex.test(mobile);
}
service.isPassword = (pass) => {
    pass = pass || ""
    return (pass.length >= 6 && pass.length <= 26);
}
service.isGender = (gender) => {
    gender = gender || "";
    var regex = /^Male$|^Female$|^Other$/
    return regex.test(gender);
}
service.pick = (o, ...props) => {
    return Object.assign({}, ...props.map(prop => ({
        [prop]: o[prop]
    })));
}
module.exports = service;
