const fauxTable = `
<table id="order_history">
  <thead>
  <tr>
    <th id="header1">
      Order ID<span class="sort_down_asc" id="byOrderNumberAsc"></span>
      <span class="sort_up_desc" id="byOrderNumberDesc"></span>
    </th>
    <th id="header2">
      PO Number<span class="sort_down_asc" id="byPONumberAsc"></span>
      <span class="sort_up_desc" id="byPONumberDesc"></span>
    </th>
    <th id="header3">
      Status<span class="sort_down_asc" id="byStatusAsc"></span>
      <span class="sort_up_desc" id="byStatusDesc"></span>
    </th>
    <th id="header4">
        Account/Site<span class="sort_down_asc" id="byB2BUnitAsc"></span>
        <span class="sort_up_desc" id="byB2BUnitDesc"></span>
      </th>
    <th id="header5">
      Date<span class="sort_down_asc" id="byDateAsc"></span>
      <span class="sort_up_desc" id="byDateDesc"></span>
    </th>
    <th id="header6">
      Postcode<span class="sort_down_asc" id="byPostcodeAsc"></span>
      <span class="sort_up_desc" id="byPostcodeDesc"></span>
    </th>
    <th id="header7">
      Value<span class="sort_down_asc" id="byTotalPriceAsc"></span>
      <span class="sort_up_desc" id="byTotalPriceDesc"></span>
    </th>
    <th id="header8">
      Actions</th>
  </tr>
  </thead>
  <tbody>
  <tr>
      <td headers="header1">
        <a href="/my-account/order/01735002">01735002</a>
      </td>
      <td headers="header2">
        <a href="/my-account/order/01735002">01735002</a>
      </td>
      <td headers="header3">
        <span>Completed</span>
      </td>
      <td headers="header4">
          <span>320723_0</span>
        </td>
      <td headers="header5">
        <span>24/09/19</span>
      </td>
      <td headers="header6">
        <span>BL6 6SU</span>
      </td>
      <td class="price" headers="header7">
        <span>£49.38</span></td>
      <td headers="header8">
        <form id="test" action="/cart/reorder" method="post">
          <input type="hidden" name="CSRFToken" value="0abb30bf-978d-4208-9205-ffac97c1097b"><input type="hidden" name="orderCode" value="01735002">
          <a href="#" class="submit">
            Add to Basket</a>
        </form>
      </td>
    </tr>
  </tbody>
</table>
`;
export default fauxTable;
