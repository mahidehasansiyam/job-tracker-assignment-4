let noOfall = document.getElementById('no-of-all');
let noOfInterview = document.getElementById('no-of-interview');
let noOfRejected = document.getElementById('no-of-rejected');
let interview = document.querySelectorAll('.interview');
let rejected = document.querySelectorAll('.rejected');
let delet = document.querySelectorAll('.delet');
let cards = document.querySelector('#cards');
let jobCount = document.querySelector('#job-count');
let allSection = document.getElementById('allSection');
let interviewSection = document.getElementById('interviewSection');
let rejectedSection = document.getElementById('rejectedSection');
let currentPage = 'allBtn';
let emptyState = document.getElementById('emptyState');

// Button Toggle 
function toggleBtn(currentBtn) {
  
  let btns = ['allBtn', 'interviewBtn', 'rejectedBtn']; 
   
  currentPage = currentBtn;

  for (const btn  of btns) { 
    const btnNane = document.getElementById(btn);
    // console.log(btnNane);
    if (btn === currentBtn) {
      btnNane.classList.remove('bg-gray-300');
      btnNane.classList.add('bg-blue-800','text-white') 
    }
    else {
      btnNane.classList.add('bg-gray-300');
      btnNane.classList.remove('bg-blue-800', 'text-white');
      
    }
  } 

  emptyState.classList.add('hidden')
  let sections = [allSection, interviewSection, rejectedSection];
  for (const section of sections) {
    section.classList.add('hidden');
  } 

  if (currentBtn === 'allBtn') { 
    allSection.classList.remove('hidden');  
    if (allSection.children.length < 1) {
      emptyState.classList.remove('hidden');
    }
  }
  else if (currentBtn === 'interviewBtn') {
    interviewSection.classList.remove('hidden');
    if (interviewSection.children.length < 1) {
      emptyState.classList.remove('hidden');
    }
  }
  else if (currentBtn === 'rejectedBtn') {
    rejectedSection.classList.remove('hidden');
    if (rejectedSection.children.length < 1) {
      emptyState.classList.remove('hidden');
    }
  }
  countUpdate();
} 

toggleBtn(currentPage);

document.getElementById('sections').addEventListener('click', function (e) {
  let parentCard = e.target.closest('.card');
  let fullContent = parentCard.parentNode;
  const status = document.querySelector('.status');

  if (e.target.classList.contains('interview')) {
    status.innerText = 'Interview';
    interviewSection.appendChild(parentCard)
  }
  if (e.target.classList.contains('rejected')) {
    status.innerText = 'Rejected';
    rejectedSection.appendChild(parentCard);
  }
  if (e.target.classList.contains('delet')) {
    fullContent.removeChild(parentCard);
    allSection.appendChild(parentCard);
  }
  
  countUpdate();
})

// Count Update
function countUpdate() {
  noOfall.innerText = allSection.children.length;
  noOfInterview.innerText = interviewSection.children.length;
  noOfRejected.innerText = rejectedSection.children.length;

  const counts = {
    allBtn: allSection.children.length,
    interviewBtn: interviewSection.children.length,
    rejectedBtn: rejectedSection.children.length
  };

  noOfall.innerText = counts.allBtn;
  noOfInterview.innerText = counts.interviewBtn;
  noOfRejected.innerText = counts.rejectedBtn;

  jobCount.innerText = counts[currentPage]

  if (counts[currentPage] < 1) {
    emptyState.classList.remove('hidden');
  }
  else {
    emptyState.classList.add('hidden');
  }

}
countUpdate();