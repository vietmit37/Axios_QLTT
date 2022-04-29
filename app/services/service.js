function Service() {
  this.fectData = function () {
    return axios({
      url: "https://625bc0d550128c5702070781.mockapi.io/api/product",
      method: "get",
    });
  };
  this.deleteData = function (id) {
    return axios({
      url: `https://625bc0d550128c5702070781.mockapi.io/api/product/${id}`,
      method: "delete",
    });
  };
  this.addData = function (data) {
    return axios({
      url: "https://625bc0d550128c5702070781.mockapi.io/api/product",
      method: "post",
      data: data,
    });
  };
  this.getDataId = function (id) {
    return axios({
      url: `https://625bc0d550128c5702070781.mockapi.io/api/product/${id}`,
      method: "get",
    });
  };
  this.updateData = function (id, data) {
    return axios({
      url: `https://625bc0d550128c5702070781.mockapi.io/api/product/${id}`,
      method: "put",
      data: data,
    });
  };
}
