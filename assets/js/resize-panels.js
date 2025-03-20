document.addEventListener('DOMContentLoaded', function() {
  const leftSidebar = document.getElementById('left-sidebar');
  const mainContent = document.getElementById('main-content');
  const rightSidebar = document.getElementById('right-sidebar');
  const leftResizeHandle = document.getElementById('left-resize-handle');
  const rightResizeHandle = document.getElementById('right-resize-handle');
  const container = document.querySelector('.content-container');
  
  let isResizingLeft = false;
  let isResizingRight = false;
  let startX = 0;
  let startLeftWidth = 0;
  let startMainWidth = 0;
  let startRightWidth = 0;
  
  // 그래프 뷰 리사이징 함수
  function resizeGraphView() {
    if (window.restartGraph) {
      window.restartGraph();
    }
  }
  
  // 왼쪽 리사이즈 핸들 이벤트
  if (leftResizeHandle) {
    leftResizeHandle.addEventListener('mousedown', function(e) {
      isResizingLeft = true;
      startX = e.clientX;
      startLeftWidth = parseInt(window.getComputedStyle(leftSidebar).width, 10);
      startMainWidth = parseInt(window.getComputedStyle(mainContent).width, 10);
      document.body.classList.add('resizing');
    });
  }

  // 오른쪽 리사이즈 핸들 이벤트
  if (rightResizeHandle) {
    rightResizeHandle.addEventListener('mousedown', function(e) {
      isResizingRight = true;
      startX = e.clientX;
      startMainWidth = parseInt(window.getComputedStyle(mainContent).width, 10);
      startRightWidth = parseInt(window.getComputedStyle(rightSidebar).width, 10);
      document.body.classList.add('resizing');
    });
  }

  // 마우스 이동 이벤트
  document.addEventListener('mousemove', function(e) {
    if (isResizingLeft) {
      const diffX = e.clientX - startX;
      const newLeftWidth = Math.max(250, Math.min(startLeftWidth + diffX, window.innerWidth * 0.4));
      leftSidebar.style.width = newLeftWidth + 'px';
      
      // 메인 콘텐츠 너비 조정
      const totalWidth = container.offsetWidth;
      const rightWidth = parseInt(window.getComputedStyle(rightSidebar).width, 10);
      const newMainWidth = totalWidth - newLeftWidth - rightWidth;
      mainContent.style.width = newMainWidth + 'px';
    }
    
    if (isResizingRight) {
      const diffX = e.clientX - startX;
      const newMainWidth = Math.max(400, Math.min(startMainWidth - diffX, window.innerWidth * 0.7));
      mainContent.style.width = newMainWidth + 'px';
      
      // 오른쪽 사이드바 너비 조정
      const totalWidth = container.offsetWidth;
      const leftWidth = parseInt(window.getComputedStyle(leftSidebar).width, 10);
      const newRightWidth = totalWidth - leftWidth - newMainWidth;
      rightSidebar.style.width = newRightWidth + 'px';
      
      // 그래프 뷰 리사이징
      resizeGraphView();
    }
  });

  // 마우스 업 이벤트
  document.addEventListener('mouseup', function() {
    if (isResizingLeft || isResizingRight) {
      isResizingLeft = false;
      isResizingRight = false;
      document.body.classList.remove('resizing');
      
      // 리사이징 완료 후 그래프 뷰 업데이트
      resizeGraphView();
    }
  });

  // 터치 이벤트 지원
  if (leftResizeHandle) {
    leftResizeHandle.addEventListener('touchstart', function(e) {
      isResizingLeft = true;
      startX = e.touches[0].clientX;
      startLeftWidth = parseInt(window.getComputedStyle(leftSidebar).width, 10);
      startMainWidth = parseInt(window.getComputedStyle(mainContent).width, 10);
      document.body.classList.add('resizing');
    });
  }

  if (rightResizeHandle) {
    rightResizeHandle.addEventListener('touchstart', function(e) {
      isResizingRight = true;
      startX = e.touches[0].clientX;
      startMainWidth = parseInt(window.getComputedStyle(mainContent).width, 10);
      startRightWidth = parseInt(window.getComputedStyle(rightSidebar).width, 10);
      document.body.classList.add('resizing');
    });
  }

  document.addEventListener('touchmove', function(e) {
    if (isResizingLeft) {
      const diffX = e.touches[0].clientX - startX;
      const newLeftWidth = Math.max(250, Math.min(startLeftWidth + diffX, window.innerWidth * 0.4));
      leftSidebar.style.width = newLeftWidth + 'px';
      
      // 메인 콘텐츠 너비 조정
      const totalWidth = container.offsetWidth;
      const rightWidth = parseInt(window.getComputedStyle(rightSidebar).width, 10);
      const newMainWidth = totalWidth - newLeftWidth - rightWidth;
      mainContent.style.width = newMainWidth + 'px';
    }
    
    if (isResizingRight) {
      const diffX = e.touches[0].clientX - startX;
      const newMainWidth = Math.max(400, Math.min(startMainWidth - diffX, window.innerWidth * 0.7));
      mainContent.style.width = newMainWidth + 'px';
      
      // 오른쪽 사이드바 너비 조정
      const totalWidth = container.offsetWidth;
      const leftWidth = parseInt(window.getComputedStyle(leftSidebar).width, 10);
      const newRightWidth = totalWidth - leftWidth - newMainWidth;
      rightSidebar.style.width = newRightWidth + 'px';
      
      // 그래프 뷰 리사이징
      resizeGraphView();
    }
  });

  document.addEventListener('touchend', function() {
    if (isResizingLeft || isResizingRight) {
      isResizingLeft = false;
      isResizingRight = false;
      document.body.classList.remove('resizing');
      
      // 리사이징 완료 후 그래프 뷰 업데이트
      resizeGraphView();
    }
  });

  // 윈도우 리사이즈 이벤트
  window.addEventListener('resize', function() {
    // 모바일 뷰에서는 리사이징 처리하지 않음
    if (window.innerWidth <= 768) {
      leftSidebar.style.width = '';
      mainContent.style.width = '';
      rightSidebar.style.width = '';
    } else {
      // 윈도우 리사이즈 시 그래프 뷰 업데이트
      resizeGraphView();
    }
  });
  
  // 초기 레이아웃 설정
  function initLayout() {
    const containerWidth = container.offsetWidth;
    const leftWidth = 250; // 초기 왼쪽 사이드바 너비
    const rightWidth = 300; // 초기 오른쪽 사이드바 너비
    const mainWidth = containerWidth - leftWidth - rightWidth;
    
    leftSidebar.style.width = leftWidth + 'px';
    mainContent.style.width = mainWidth + 'px';
    rightSidebar.style.width = rightWidth + 'px';
    
    // 초기 그래프 뷰 크기 설정
    setTimeout(resizeGraphView, 500);
  }
  
  // 페이지 로드 시 레이아웃 초기화
  initLayout();
  
  // 그래프 뷰 리사이징 함수를 전역으로 노출
  window.resizeGraphView = resizeGraphView;
});
