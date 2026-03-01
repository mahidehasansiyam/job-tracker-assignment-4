
const allSection = document.getElementById('allSection');
const interviewSection = document.getElementById('interviewSection');
const rejectedSection = document.getElementById('rejectedSection');

const NoOfAll = document.getElementById('no-of-all');
const NoOfIntervied = document.getElementById('no-of-interview');
const NoOfRejected = document.getElementById('no-of-rejected');

const emptyState = document.getElementById('emptyState');

const jobCount = document.getElementById('job-count');


let currentPage = 'allBtn';

function toggleBtn(currentBtn) {

  currentPage = currentBtn;
  const btns = ['allBtn', 'interviewBtn', 'rejectedBtn'];
  for (const btn of btns) {

    const button = document.getElementById(btn)
    button.classList.remove('bg-black','text-white')

    if (currentBtn === btn) {
      button.classList.add('bg-black', 'text-white');
    }
  }
  
  emptyState.classList.add('hidden');

  const sections = [allSection, interviewSection, rejectedSection]
  for (const section of sections) {
    section.classList.add('hidden')

    if (currentBtn === 'allBtn') {
      allSection.classList.remove('hidden')
    }
    if (currentBtn === 'interviewBtn') {
      interviewSection.classList.remove('hidden'); 
    }
    if (currentBtn === 'rejectedBtn') {
      rejectedSection.classList.remove('hidden');    
    }
  }
  EmptyState();
  noOfJob();
}
toggleBtn(currentPage);

function noOfJob() {
  if (currentPage === 'allBtn') {
    jobCount.innerText = allSection.children.length;
  }
  if (currentPage === 'interviewBtn') {
    jobCount.innerText = interviewSection.children.length;
  }
  if (currentPage === 'rejectedBtn') {
    jobCount.innerText = rejectedSection.children.length;
  }
}
noOfJob();


document.getElementById('sections').addEventListener('click', (e) => {
  
  const parentCard = e.target.closest('.card');
  const fullCardContent = parentCard.parentNode;

  const status = parentCard.querySelector('.status')
  
  // console.log(e.target);
  if (e.target.classList.contains('interview')) {
    status.innerText = 'Interview';
    interviewSection.appendChild(parentCard);
  }
  if (e.target.classList.contains('rejected')) {
    status.innerText = 'Rejected';
    rejectedSection.appendChild(parentCard);
  }
  if (e.target.classList.contains('delet')) {
    status.innerText = 'NOT Applied';
    allSection.appendChild(parentCard);
  }

  
  countUpdate();
  EmptyState();
  noOfJob();
})

function EmptyState() {

  emptyState.classList.add('hidden');

  if (currentPage === 'allBtn' && allSection.children.length < 1) {
    emptyState.classList.remove('hidden');
  }
  if (currentPage === 'interviewBtn' && interviewSection.children.length < 1) {
    emptyState.classList.remove('hidden');
  }
  if (currentPage === 'rejectedBtn' && rejectedSection.children.length < 1) {
    emptyState.classList.remove('hidden');
  }
}
EmptyState()

function countUpdate(){
  NoOfAll.innerText = allSection.children.length;
  NoOfIntervied.innerText = interviewSection.children.length;
  NoOfRejected.innerText = rejectedSection.children.length;
  
}
countUpdate();



