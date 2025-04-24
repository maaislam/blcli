const specificationList = (get_spec_list_data, id) =>{
    const spec_list = () => {
        let r_string = "";
        get_spec_list_data.forEach((data) => {
          r_string =
            r_string +
            `               
          <div class="${id}__spec_list_wrapper">
            <span class="${id}__spec_list_content">${data?.textContent}</span>
          </div>     
        `;
        });

        return r_string;
    
    };

    const htmlStr = `<div class="${id}__spec_list_container">
                      ${spec_list()}
                    </div>`;
  
    return htmlStr.trim();
}
export default specificationList;

