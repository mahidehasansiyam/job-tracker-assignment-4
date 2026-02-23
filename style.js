let noOfTotal = document.getElementById('no-of-total');
let noOfInterview = document.getElementById('no-of-interview');
let noOfRejected = document.getElementById('no-of-rejected');
let delet = document.querySelectorAll('.delet');
let status = document.querySelectorAll('.status');
let interview = document.querySelectorAll('.interview');
let rejected = document.querySelectorAll('.rejected');
let cards = document.querySelector('#cards');
let jobCount = document.querySelector('#job-count');
let mainContent = document.querySelector('.main-content');
let filterSection = document.querySelector('#filter-section');
let interviewArry = [];
let rejectedArry = []; 
let currentFilter = 'all';

function calculateCount() {
  jobCount.innerText = cards.children.length;
  noOfTotal.innerText = cards.children.length;
  noOfInterview.innerText = interviewArry.length;
  noOfRejected.innerText = rejectedArry.length;
}
calculateCount();

let allBtn = document.getElementById('allBtn');
let interviewBtn = document.getElementById('interviewBtn');
let rejectedBtn = document.getElementById('rejectedBtn');

function toggleStatus(id) {
  // console.log(id, 'click');

  allBtn.classList.remove('bg-blue-800', 'text-white');
  interviewBtn.classList.remove('bg-blue-800', 'text-white');
  rejectedBtn.classList.remove('bg-blue-800', 'text-white');

  allBtn.classList.add('bg-gray-300', 'text-black');
  interviewBtn.classList.add('bg-gray-300', 'text-black');
  rejectedBtn.classList.add('bg-gray-300', 'text-black');

  const selected = document.getElementById(id);
  // console.log(selected);
  currentFilter = id;

  selected.classList.remove('bg-gray-300', 'text-black');
  selected.classList.add('bg-blue-800', 'text-white');

  if (id === 'interviewBtn'){
    cards.classList.add('hidden');
    filterSection.classList.remove('hidden');
    renderInterview();
    
  }
  else if (id === "allBtn") {
    cards.classList.remove('hidden');
    filterSection.classList.add('hidden');
  }
  else if (id === 'rejectedBtn') {
    cards.classList.add('hidden');
    filterSection.classList.remove('hidden');
    renderRejected();
  }
}
       
// Event delegation for status buttons
mainContent.addEventListener('click', function (e) {

  if (e.target.classList.contains('interview')) {
    let parentNode = e.target.parentNode.parentNode.parentNode;
    let jobName = parentNode.querySelector('.job-name').innerText;
    let jobType = parentNode.querySelector('.job-type').innerText;
    let salery = parentNode.querySelector('.salery').innerText;
    let status = parentNode.querySelector('.status').innerText;
    let description = parentNode.querySelector('.description').innerText;

    parentNode.querySelector('.status').innerText = 'Interview';

    let cardInfo = {
      jobName,
      jobType,
      salery,
      status: 'Interview',
      description,
    };
    // console.log(cardInfo);

    let interviewExist = interviewArry.find(
      item => item.jobName === cardInfo.jobName,
    );

    if (!interviewExist) {
      interviewArry.push(cardInfo);
    }

    rejectedArry = rejectedArry.filter(item => item.jobName !== cardInfo.jobName);  // Remove from rejected if it exists there
    if (currentFilter === 'rejectedBtn') {
      renderRejected();
    }

    calculateCount();
    
  }
  else if (e.target.classList.contains('rejected')) {
    let parentNode = e.target.parentNode.parentNode.parentNode;
    let jobName = parentNode.querySelector('.job-name').innerText;
    let jobType = parentNode.querySelector('.job-type').innerText;
    let salery = parentNode.querySelector('.salery').innerText;
    let status = parentNode.querySelector('.status').innerText;
    let description = parentNode.querySelector('.description').innerText;

    parentNode.querySelector('.status').innerText = 'Rejected';

    let cardInfo = {
      jobName,
      jobType,
      salery,
      status: 'Rejected',
      description,
    };
    // console.log(cardInfo);

    let interviewExist = rejectedArry.find(
      item => item.jobName === cardInfo.jobName,
    );

    if (!interviewExist) {
      rejectedArry.push(cardInfo);
    }

    interviewArry = interviewArry.filter(item => item.jobName !== cardInfo.jobName);  // Remove from interview if it exists there
    if (currentFilter === 'interviewBtn') {
      renderInterview();
    }
    // else if (currentFilter === 'rejectedBtn') {
    //   renderRejected();
    // }

    calculateCount();
  
  }
  
})

// interview.forEach((btn) => {
//   btn.addEventListener('click', function (e) {
//     let parentNode = e.target.parentNode.parentNode.parentNode;
//     let jobName = parentNode.querySelector('.job-name').innerText;
//     let jobType = parentNode.querySelector('.job-type').innerText;
//     let salery = parentNode.querySelector('.salery').innerText;
//     let status = parentNode.querySelector('.status').innerText;
//     let description = parentNode.querySelector('.description').innerText;
  
//     let cardInfo = {
//       jobName,
//       jobType,
//       salery,
//       status,
//       description
//     }
//     // console.log(cardInfo);
//   })

//   let interviewExist = interviewArry.find(
//     item => item.jobName === cardInfo.jobName,
//   );

//   if (!interviewExist) {
//     interviewArry.push(cardInfo);
//   }
//   console.log(interviewArry);
// })

function renderInterview() {
  filterSection.innerHTML = '';
 
  for (let interview of interviewArry) {
    // console.log(interview); 

    let div = document.createElement('div');
    div.className=('card w-full md:w-1/2 lg:w-full p-3'); 
    div.innerHTML = `
    <div
            class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full flex justify-between hover:border-blue-300 transition-all duration-300">
            <div>
              <div>
                <h2 class="job-name text-lg font-bold">${interview.jobName}</h2>
                <p class="job-type text-[#718096] text-sm font-medium">${interview.jobType}</p>
                <div class="flex items-center text-[#718096] text-[11px] my-3 gap-1">
                  <span class="salery">${interview.salery}</span>
                </div>
                <span
                  class="status inline-block bg-gray-400  text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider mb-4">${interview.status}</span>
                <p class="description text-[#4a5568] text-sm mb-6 line-clamp-2 leading-relaxed">
                  ${interview.description}
                </p>
              </div>
              <div class="flex gap-2">
                <button
                  class="interview border-2 border-green-500 text-[#10b981] font-bold p-2 rounded-md text-[11px] uppercase hover:bg-emerald-50 transition-colors">Interview</button>
                <button
                  class="rejected border-2 border-red-500 text-[#f87171] font-bold p-2 rounded-md text-[11px] uppercase hover:bg-red-50 transition-colors">Rejected</button>
              </div>
            </div>
            <div><button class="delet" class="cursor-pointer"><i class="fa-regular fa-trash-can"></i></button></div>
          </div>
    `;
    filterSection.appendChild(div);
  }
  // console.log(interviewArry);
}

function renderRejected() {
  filterSection.innerHTML = '';

  for (let reject of rejectedArry) {
    // console.log(interview);

    let div = document.createElement('div');
    div.className = 'card w-full md:w-1/2 lg:w-full p-3';
    div.innerHTML = `
    <div
            class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full flex justify-between hover:border-blue-300 transition-all duration-300">
            <div>
              <div>
                <h2 class="job-name text-lg font-bold">${reject.jobName}</h2>
                <p class="job-type text-[#718096] text-sm font-medium">${reject.jobType}</p>
                <div class="flex items-center text-[#718096] text-[11px] my-3 gap-1">
                  <span class="salery">${reject.salery}</span>
                </div>
                <span
                  class="status inline-block bg-gray-400  text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider mb-4">${reject.status}</span>
                <p class="description text-[#4a5568] text-sm mb-6 line-clamp-2 leading-relaxed">
                  ${reject.description}
                </p>
              </div>
              <div class="flex gap-2">
                <button
                  class="interview border-2 border-green-500 text-[#10b981] font-bold p-2 rounded-md text-[11px] uppercase hover:bg-emerald-50 transition-colors">Interview</button>
                <button
                  class="rejected border-2 border-red-500 text-[#f87171] font-bold p-2 rounded-md text-[11px] uppercase hover:bg-red-50 transition-colors">Rejected</button>
              </div>
            </div>
            <div><button class="delet" class="cursor-pointer"><i class="fa-regular fa-trash-can"></i></button></div>
          </div>
    `;
    filterSection.appendChild(div);
  }
  // console.log(interviewArry);
}
 