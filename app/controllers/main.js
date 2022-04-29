const service = new Service();
const validation = new Validation();
function getEle(id) {
  return document.getElementById(id);
}
getListTeacher();
let dsGv = [];
console.log(dsGv.length);
function getInfoTeacher() {
  let taiKhoan = getEle("TaiKhoan").value;
  let matKhau = getEle("MatKhau").value;
  let hoTen = getEle("HoTen").value;
  let email = getEle("Email").value;
  let loaiND = getEle("loaiNguoiDung").value;
  let ngonNgu = getEle("loaiNgonNgu").value;
  let moTa = getEle("MoTa").value;
  let hinhAnh = getEle("HinhAnh").files[0];
  let img = getEle("img").src;
  let isValid = true;
  isValid &=
    validation.kiemTraRong(taiKhoan, "errTk", "Khoong duoc de trong") &&
    validation.kiemtraTrung(taiKhoan, "errTk", "Tai khoan da ton tai", dsGv);
  isValid &=
    validation.kiemTraRong(matKhau, "errMk", "Khoong duoc de trong") &&
    validation.kiemTraMk(
      matKhau,
      "errMk",
      "Mật khẩu phải chứa ký tự hoa, thường, số và ký tự đặc biệt"
    );
  isValid &=
    validation.kiemTraRong(hoTen, "errHoTen", "Khoong duoc de trong") &&
    validation.kiemTraChuoiKiTu(hoTen, "errHoTen", "Ten khong hop le");
  isValid &=
    validation.kiemTraRong(email, "errEmail", "Khoong duoc de trong") &&
    validation.kiemTraEmail(email, "errEmail", "Email khong hop le");
  isValid &= validation.kiemTraRong(loaiND, "errNd", "Khoong duoc de trong");
  isValid &= validation.kiemTraRong(ngonNgu, "errNn", "Khoong duoc de trong");
  isValid &=
    validation.kiemTraRong(moTa, "errMt", "Khoong duoc de trong") &&
    validation.kiemTraDoDaiKiTu(
      moTa,
      "errMt",
      "Mo ta không vượt quá 60 ký tự ",
      0,
      60
    );
  isValid &= validation.kiemTraRong(img, "errHA", "Hãy chọn hình ảnh");
  if (isValid) {
    let data = new Teacher(
      "",
      taiKhoan,
      matKhau,
      hoTen,
      email,
      loaiND,
      ngonNgu,
      moTa,
      hinhAnh?.name || undefined
    );
    return data;
  }
  return null;
}
function getListTeacher() {
  service
    .fectData()
    .then((res) => {
      renderListTeacher(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      getEle("loading").style.display = "none";
    });
}
function renderListTeacher(data) {
  let content = "";
  data.forEach((item, index) => {
    let {
      id,
      taiKhoan,
      matKhau,
      hoTen,
      email,
      loaiND,
      ngonNgu,
      moTa,
      hinhAnh,
    } = item;
    content += `<tr>
        <td>${index + 1}</td>
        <td>${taiKhoan}</td>
        <td>${matKhau}</td>
        <td>${hoTen}</td>
        <td>${email}</td>
        <td>${loaiND}</td>
        <td>${ngonNgu}</td>
        <td>${moTa}</td>
        <td>
        <button class="btn btn-success"  data-toggle="modal"
        data-target="#myModal" onclick="sua(${id})">Sửa</button>
        <button class="btn btn-danger" onclick="deleteUser(${id})">Xóa</button>
        </td>
    </tr>`;
    // push data vao mang
    dsGv.push({
      id,
      taiKhoan,
      matKhau,
      hoTen,
      email,
      loaiND,
      ngonNgu,
      moTa,
      hinhAnh,
    });
  });
  getEle("tblDanhSachNguoiDung").innerHTML = content;
  return dsGv;
}
console.log(dsGv);

// Xoa nguoi dung
function deleteUser(id) {
  if (confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
    service
      .deleteData(id)
      .then(() => {
        console.log("Xoa thanh cong");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        getListTeacher();
      });
  }
}

// Them nguoi dung
getEle("btnThemNguoiDung").addEventListener("click", () => {
  document.querySelector(".modal-title").innerHTML = "Thêm người dùng";
  let footer = document.querySelector(".modal-footer");
  getEle("TaiKhoan").value = "";
  getEle("MatKhau").value = "";
  getEle("HoTen").value = "";
  getEle("Email").value = "";
  getEle("loaiNguoiDung").value = "";
  getEle("loaiNgonNgu").value = "";
  getEle("MoTa").value = "";
  getEle("img").src = "";
  footer.innerHTML = `<button class="btn btn-success" onclick="addUser()" data-dismiss="modal">Thêm</button>`;
});
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

async function onChangeFile() {
  let hinhAnh = getEle("HinhAnh").files[0];
  getEle("img").src = await toBase64(hinhAnh);
}
async function addUser() {
  let data = getInfoTeacher();
  if (data) {
    service
      .addData(data)
      .then(() => {
        console.log("Them thanh cong");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        getListTeacher();
      });
  } else {
    alert("Thêm thất bại");
  }
}

// lay thong tin nguoi dung
function sua(id) {
  document.querySelector(".modal-title").innerHTML = "Sửa người dùng";
  let footer = document.querySelector(".modal-footer");
  footer.innerHTML = `<button class="btn btn-success" onclick="update(${id})" data-dismiss="modal">Update</button>`;
  service
    .getDataId(id)
    .then((res) => {
      let { taiKhoan, matKhau, hoTen, email, loaiND, ngonNgu, moTa, hinhAnh } =
        res.data;
      getEle("TaiKhoan").value = taiKhoan;
      getEle("MatKhau").value = matKhau;
      getEle("HoTen").value = hoTen;
      getEle("Email").value = email;
      getEle("loaiNguoiDung").value = loaiND;
      getEle("loaiNgonNgu").value = ngonNgu;
      getEle("MoTa").value = moTa;
      getEle("img").src = `../../assets/img/${hinhAnh}`;
    })
    .catch((err) => {
      console.log(err);
    });
}

// update nguoi dung
function update(id) {
  let data = getInfoTeacher();
  service
    .updateData(id, data)
    .then(() => {
      console.log("Update thanh cong");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      getListTeacher();
    });
}
