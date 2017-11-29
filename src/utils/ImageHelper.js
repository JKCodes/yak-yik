export default {

  thumbnail: (url, size) => {
    let thumbParams = `upload/c_thumb,h_${size},w_${size},x_0,y_0`
  
    return url.replace('upload', thumbParams)
  }
}