function Validation() {
  this.dieuKien = function (condition, id, message) {
    if (condition) {
      getEle(id).innerHTML = "";
      getEle(id).style.display = "none";
      return true;
    }
    getEle(id).innerHTML = message;
    getEle(id).style.display = "block";
    return false;
  };
  this.kiemTraRong = function (input, error, mess) {
    return this.dieuKien(input !== "", error, mess);
  };
  this.kiemTraChuoiKiTu = function (input, error, message) {
    let letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    return this.dieuKien(input.match(letter), error, message);
  };
  this.kiemTraEmail = function (input, error, message) {
    let letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return this.dieuKien(input.match(letter), error, message);
  };
  this.kiemTraMk = function (input, error, message) {
    let letter =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return this.dieuKien(input.match(letter), error, message);
  };
  this.kiemTraDoDaiKiTu = function (input, error, message, min, max) {
    return this.dieuKien(
      input.trim().length >= min && input.trim().length <= max,
      error,
      message
    );
  };
  this.kiemtraTrung = function (input, error, message, arr) {
    let check = false;
    for (let i = 0; i < arr.length; i++) {
      let teacher = arr[i];
      if (teacher.taiKhoan === input) {
        check = true;
        break;
      }
    }
    return this.dieuKien(check == false, error, message);
  };
}
