/*eslint-disable */
import { events, getUrlParameter, getCookie } from '../../../../../lib/utils';
const nh13 = () => {
  events.setTrackerName('tracker2');
  $ = window.jQuery;

  const hasDoneSearch = getCookie('WEBRES_SEARCH');
  if (!hasDoneSearch) {
    return
  }
  // Add back link
  const backlinkRef = document.querySelector('.main-content .content .split-column');
  const backLink = document.querySelector('.destination-box .buttons a.back'); 
  if (backLink) {
    backLink.classList.add('nh20-back-btn');
    backlinkRef.insertAdjacentHTML('beforebegin', backLink.outerHTML);
  }

  // Re arrange subheader CTA
  const subHead = (() => {
    let bookBtn = document.querySelector('.sticky-row .container .left > a.orange-btn'),
      price = document.querySelector('.destination-box .clearfix span.blue-line:nth-of-type(3)');
    if (bookBtn) {
      bookBtn = bookBtn.cloneNode(true);
    }

    // Move price before date
    const ref = document.querySelector('.destination-box .clearfix span.blue-line:first-of-type');
    if (ref) {
      ref.insertAdjacentElement('afterend', price);
      ref.insertAdjacentElement('beforebegin', bookBtn);
    }

  })();


  // Move slider into highlights
  const highlightImg = document.querySelector('.tab-area .tab-content .content-block:first-of-type .with-image .slider-area');
  const mainSlider = document.querySelector('.main-content .content .container .right .single-slider');
  if (highlightImg && mainSlider) {
    highlightImg.innerHTML = '';
    highlightImg.appendChild(mainSlider);

    highlightImg.classList.add('nh20-slider');
  }

  // Columns
  /*
  *	Containing the bus diagram,
  *	rooms and table
  *	Departure location, date and time
  */
  const twoCol = () => {
    
    // Seating
    let seatDiagram = document.createElement('div');
    seatDiagram.classList.add('nh20-seats');
    const seating = document.querySelector('.availability-wrap .book-seats .seat-area');
    const seatingkey = document.querySelector('.availability-wrap .book-seats .seat-availability.sml');
    if (seating && seatingkey) {
      seatDiagram.appendChild(seating);
      seatDiagram.appendChild(seatingkey);
      seatDiagram = seatDiagram.outerHTML;
    }

    // Price table
    let priceTable = document.querySelector('.book-seats .price-table');
    if (priceTable) {
      priceTable = priceTable.outerHTML; 
    }

    // Rooms
    let roomsOffered = document.querySelectorAll('.book-seats .price-table .row:not(.head) .cell:first-of-type');		
    let roomsOfferedArr = [...roomsOffered];
    let rooms = [];
    roomsOfferedArr.forEach(element => {
      let roomType = element.innerText;
      rooms.push(roomType);
    });

   
    // Right col
    const departInformation = document.querySelector('.availability-wrap .date-selected');
    let moreDates = document.querySelector('.sticky-row .left .see-more-dates');

    if (departInformation && moreDates) {
      moreDates = moreDates.cloneNode(true);
      departInformation.insertAdjacentElement('beforeend', moreDates);
    }

    const FormWrapper = document.querySelector('form#Form1');
    let tourID = null;
    if (FormWrapper) {
      const FormAction = FormWrapper.getAttribute('action');
      tourID = getUrlParameter('firsttour', FormAction);
      if (tourID == null) {
        tourID = getUrlParameter('tourid', FormAction);
      }
    }
    

    // Show actual available rooms
    const getRooms = (() => {
      var http = new XMLHttpRequest();
      var url = "/WebServices/TourServices.asmx/GetTourInfoT3";
      var params = tourID;
      http.open("POST", url, true);

      //Send the proper header information along with the request
      http.setRequestHeader("Content-type", "application/json");

      http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
          const response = http.responseText;
          const parsedResponse = JSON.parse(response);
          
          // Hotels
          const hotels = parsedResponse.d.Hotels;
          // Rooms array
          const rooms = hotels[0].Rooms;
          rooms.forEach((element, index) => {
            let roomType = element.Type;
            let roomAvail = element.Available;
            
            if (roomType == "SINGLE" && roomAvail > 0) {
              const singleIcons = document.querySelector('.nh20-single');
              singleIcons.classList.add('nh20-show-icons');
            } else if (roomType == "DOUBLE" && roomAvail > 0) {
              const doubleIcons = document.querySelector('.nh20-double');
              doubleIcons.classList.add('nh20-show-icons');
              
            } else if (roomType == "TWIN" && roomAvail > 0) {
              const twinIcons = document.querySelector('.nh20-twin');
              twinIcons.classList.add('nh20-show-icons');
              
            } else if (roomType == "TRIPLE" && roomAvail > 0) {
              const tripleIcons = document.querySelector('.nh20-triple');
              tripleIcons.classList.add('nh20-show-icons');
              
            } else if (roomType == "QUAD" || roomType == "4 BEDDED" && roomAvail > 0) {
              const quadIcons = document.querySelector('.nh20-quad');
              quadIcons.classList.add('nh20-show-icons');
            }
             
          });


        }
      }
      http.send(JSON.stringify({'tourId': params}));

      
    })();
    

    // HTML Template
    const html = `
      <div class="nh20-leftcol">
        <h3>Remaining seats available</h3>
        ${seatDiagram}

        <h3>Remaining rooms available</h3>
        <div class="nh20-single nh20-room-icon nh20-ib">
          <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
          <p>Single</p>
        </div>
        <div class="nh20-twin nh20-room-icon nh20-ib">
          <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
          <div class="nh20-space"></div>
          <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
          <p>Twin</p>
        </div>
        <div class="nh20-double nh20-room-icon nh20-ib">
          <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
          <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
           <p>Double</p>
        </div>
        <div class="nh20-triple nh20-room-icon nh20-ib">
          <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
          <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
          <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
          <p>Triple</p>
        </div>
        <div class="nh20-quad nh20-room-icon nh20-ib">
          <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
          <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
          <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
          <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
          <p>Quad</p>
        </div>

        <h3>Room prices for this trip</h3>
        ${priceTable}

      </div>
      <div class="nh20-rightcol">
        ${departInformation.outerHTML} 

      </div> 
      <div class="nh20-rightcol nh20-rightcol--bottom">
        
        <h3>44% of our customers only book with us! See why below</h3>

        <h4>A National Holidays break means...</h4>

        <div class="nh20-rightcol__section">
          <h5>A relaxing journey</h5>
          <p>Comfortable coach travel to and from your hotel and to all activities on your itinerary</p>
        </div>

        <div class="nh20-rightcol__section">
          <h5>...and a comfortable stay</h5>
          <p>Access to amazing, value-for-money hotels through our strong hotel partnerships</p>
        </div>

        <p>Our customers love our value for money!</p>

        <ul>
          <li>43% of customers go on 2-3 trips a year</li>
          <li>32% of our customers have booked with us 10 times!!</li>
        </ul>

        <div class="nh20-bottom-img">
          <img alt="Trip Advisor" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxEPEBEUExIVFhIQFxQYFhcSFhUSEhQaFxQXGBcYExQYHSggGxwlHBcVITEhJSkrLi4vFyszODMuNygtLisBCgoKDg0OGxAQGywmICQsLzcsLSw3LzQ0LCwsNCwsLCwsLCwsLCwsLCwsNCwsLCwsLCwsLCwsNCwsLCwsLCwsLP/AABEIAIUBegMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYCBAcDAf/EAEEQAAEDAgMFBQUGAwYHAAAAAAEAAgMEEQUSIQYTMUFRByJhcYEykaGxshQjM0JyczSCkhUkUsLw8TVDYmODouH/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQIDBAX/xAAmEQACAgICAQUAAgMAAAAAAAAAAQIRAxIhMSIEE0FRYTKRFIGx/9oADAMBAAIRAxEAPwDxREXjHmhERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQHwlLjqvGspWzRuY7g8EeI6EeIXPtmtlqvEql1PTjMWE55CSImAEjM53Q20A1PJb4cKyfJpjx7/ACW/EtpYIHZATJJewZH3jc6AE8L+HFbVJhWOVVjHRsgYeBqTld/STm/9VY8O7BqZrBv6yYydYQyJoPhmDiV44lsFi2DNM+G1klRGzV9PKMznAccrL5X6chld0uV0P09Lxq/06oYYLs0Wdn+NO1dW07T0a0uHv3awl2IxyPVs9LNbkbsJ8u6B8Ve9htrosVpy9oyTR2bNFe5Y48COZabGx8COSr+1u2VVLV/2dhTA+q4Sy2BbDbiBfugi4u43AOgBPDkjLLKelL+jqeHCo3RTa2trqG326hkjZw3sffi/qBLfTNdSFDiMU7c0bw4c+RH6gdQrFB2MOnGfEMSnkldq7Ie4PDNJe+vgPJQe0/YZNEx0lFOZi0X3UoDJHfokHdJ8CB5r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DoNAul+r44Rs/UfhQsY2UljjY9rjLK533vO5edCCdeJsSet1M4VSVuDyR1NE/M9rbTRnVsg4kZdLt8OItcKzIsl6mZn70ifwztvoHty1cE0Mg9oZRKy/gdHe9q0sd7axK0xYZTSPlOgklaAxniIwTf8AmsPNREtOx/tMa79TQfmso42tFmgAdAAB8Fr/AJfHRp/kfhEYFhL43ST1DzJVTkl7ibkXNyL8yTxPhoppEXJKTk7Zzyk5O2VXb3D3yRxyMBO6Lg4AXNnW1t4EfFR2C7XGOOKEx5iC1gdmsLXsLi3ED5K9rARNvfKL9bC/vWscq01krNFkWurRVu0MfdQ/rd9KldlP4ODyP1FSxC+qryXBQKufjqauKfgTftyfQVT+ztpEs2n5G/Ur0vgCRyVFx+wp1Fo5ptHCZMQkYOL3xtF+F3NYBf3qWj2onpBuqiEl7NA4nLmtwubWPmFoYr/xX/zQ/wCRdDewHiAfMXXRkmlGKavg2nJJJNHOHCpxWcHLZo0uL7uNvPU8T811TZWobQzU7gO5DZpHE5S0tJ87G60wLcPgvqwnmcqrhIylkuq+DqGPYHFibY5IpgC0WDh32kHWxF7ggrSwrCqbDJWF8u8qJCGMaABlzGxOW5tpzPlzXPmSObwcR5Ej5LEnnz+Ks80b215LPKruuS7dp5BfTfpl+bFK7PYxDX024mI3mXK5pNi8Dg5h689OBXNCboo9/wA3KuyPd8m/svztg4I3F0lQRE3U3DWG3Qvvb4KxYRiMU8D90LRRl0bOQIawagchrb0XIpJXO4ucbdST81iHHqrRzxi/GJKyqPSMQp/YvFfs1U25+7msx3QXPdPofgSoFFhGTi7RlF07JzbHFvtVS6x+7i7jOhse871PwAULF7TfMfNYokpOTthyt2dL7RHA0Y1/5jPkVW9l9noa2F+aUsla8gWLT3creLDra5OqrJceq+BaSyqUtmi7yJyto6Fhuw7IJWyST5mxkOAyhguDcZnEnS6jdv8AHY6jJDE4ObG7M5w9kusQA08+J1VRfI48XEjxJKxUyyrXWKoPIqqKovuxG0ce6FPM4NLbhhd7Lmn8pPAEePJZ1nZ+x7y6KbIx2uUtz28Gm4081z9e0dXI0WbI8DoHOA9wKLMmqmrolZE1UlZ0yI0mDwEZrvdqRpvJDy0HAfALnTqt09SJH+1JI0noO8LAeAFh6LTc4k3JuTzOpXxVnl2pJUkRLJfHwdH7SnA00f7o+hy5wvpceq+KMk95WROezsIiLMoEREAREQBERAEREAREQBERAEREAREQBERAEREAREQEJUbNQyVG/Ln58zXWBblu21uV7aDmptEVpScuyXJvsIiKpAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQH//2Q==">
        </div>
      </div> 
    `;
    
    return html
    
  }
  const columns = twoCol();

  backlinkRef.insertAdjacentHTML('beforeend', columns);
  
  
  /*
  *	Change elements on the page as needed
  */
  // Change From text
  const currentFromText = document.querySelector('.date-selected span.orange');
  if (currentFromText) {
    const fromText = currentFromText.innerText;

    const updatedFromText = fromText.replace('From ', 'Departing from ');
    currentFromText.innerText = updatedFromText;
  }


  // Click events 
  const onClick = (() => {
    const departPointsLink = document.querySelector('.date-selected .link > span');
    const departList = document.querySelector('.date-selected .link ul.points');
    departPointsLink.addEventListener('click', function() {
      departList.classList.toggle('nh20-show-list');
    });

    // On click of departure sub links.
    function preventClick(e) {
      e.preventDefault();
    }

    const departureLinks = document.querySelectorAll('.date-selected .link ul.points li a');
    for (let i = 0; departureLinks.length > i; i++) {
      departureLinks[i].addEventListener('click', preventClick, false);  
    }

    // On date change
    const dateSelect = document.querySelector('.nh20-rightcol .date-selected .see-more-dates select#ddlMoreDates');
    dateSelect.addEventListener("change", function() {
      let url = this.options[this.selectedIndex].value;
      window.location = url;
    });
  })();
}

export default nh13;
