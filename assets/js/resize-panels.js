// 패널 리사이징 기능 구현
document.addEventListener('DOMContentLoaded', function() {
  // 요소 선택
  const leftSidebar = document.getElementById('left-sidebar');
  const mainContent = document.getElementById('main-content');
  const rightSidebar = document.getElementById('right-graph-sidebar');
  
  // 초기 너비 설정 (로컬 스토리지에서 불러오기 또는 기본값 사용)
  const savedLeftWidth = localStorage.getItem('leftSidebarWidth');
  const savedMainWidth = localStorage.getItem('mainContentWidth');
  
  if (savedLeftWidth) {
    leftSidebar.style.width = savedLeftWidth;
  } else {
    leftSidebar.style.width = '250px';
  }
  
  if (savedMainWidth) {
    mainContent.style.width = savedMainWidth;
  } else {
    mainContent.style.width = 'calc(100% - 550px)';
  }
  
  // 왼쪽 사이드바 리사이징 기능
  let isLeftResizing = false;
  let initialLeftX;
  let initialLeftWidth;
  
  // 메인 콘텐츠 리사이징 기능
  let isMainResizing = false;
  let initialMainX;
  let initialMainWidth;
  
  // 마우스 이벤트 리스너 설정
  leftSidebar.addEventListener('mousedown', function(e) {
    // 오른쪽 경계에서 5px 이내인 경우에만 리사이징 시작
    if (e.clientX > leftSidebar.getBoundingClientRect().right - 5) {
      isLeftResizing = true;
      initialLeftX = e.clientX;
      initialLeftWidth = leftSidebar.getBoundingClientRect().width;
      
      // 커서 스타일 변경
      document.body.style.cursor = 'ew-resize';
      
      // 선택 방지
      e.preventDefault();
    }
  });
  
  mainContent.addEventListener('mousedown', function(e) {
    // 오른쪽 경계에서 5px 이내인 경우에만 리사이징 시작
    if (e.clientX > mainContent.getBoundingClientRect().right - 5) {
      isMainResizing = true;
      initialMainX = e.clientX;
      initialMainWidth = mainContent.getBoundingClientRect().width;
      
      // 커서 스타일 변경
      document.body.style.cursor = 'ew-resize';
      
      // 선택 방지
      e.preventDefault();
    }
  });
  
  document.addEventListener('mousemove', function(e) {
    // 왼쪽 사이드바 리사이징
    if (isLeftResizing) {
      const newWidth = initialLeftWidth + (e.clientX - initialLeftX);
      
      // 최소/최대 너비 제한
      if (newWidth >= 180 && newWidth <= window.innerWidth * 0.4) {
        leftSidebar.style.width = newWidth + 'px';
        
        // 메인 콘텐츠 너비 조정
        const totalWidth = window.innerWidth;
        const rightWidth = rightSidebar ? rightSidebar.getBoundingClientRect().width : 0;
        const mainWidth = totalWidth - newWidth - rightWidth;
        mainContent.style.width = mainWidth + 'px';
      }
    }
    
    // 메인 콘텐츠 리사이징
    if (isMainResizing) {
      const newWidth = initialMainWidth + (e.clientX - initialMainX);
      const leftWidth = leftSidebar.getBoundingClientRect().width;
      const totalWidth = window.innerWidth;
      
      // 최소/최대 너비 제한
      if (newWidth >= 300 && newWidth <= totalWidth - leftWidth - 200) {
        mainContent.style.width = newWidth + 'px';
        
        // 오른쪽 사이드바 너비 조정
        if (rightSidebar) {
          const rightWidth = totalWidth - newWidth - leftWidth;
          rightSidebar.style.width = rightWidth + 'px';
          
          // 그래프 뷰 리사이징 이벤트 발생
          const graphResizeEvent = new Event('graphResize');
          rightSidebar.dispatchEvent(graphResizeEvent);
        }
      }
    }
  });
  
  document.addEventListener('mouseup', function() {
    if (isLeftResizing) {
      isLeftResizing = false;
      
      // 로컬 스토리지에 너비 저장
      localStorage.setItem('leftSidebarWidth', leftSidebar.style.width);
    }
    
    if (isMainResizing) {
      isMainResizing = false;
      
      // 로컬 스토리지에 너비 저장
      localStorage.setItem('mainContentWidth', mainContent.style.width);
      
      // 그래프 뷰 리사이징 이벤트 발생
      if (rightSidebar) {
        const graphResizeEvent = new Event('graphResize');
        rightSidebar.dispatchEvent(graphResizeEvent);
      }
    }
    
    // 커서 스타일 복원
    document.body.style.cursor = 'default';
  });
  
  // 윈도우 리사이즈 이벤트 처리
  window.addEventListener('resize', function() {
    // 전체 너비 계산
    const totalWidth = window.innerWidth;
    const leftWidth = leftSidebar.getBoundingClientRect().width;
    const mainWidth = mainContent.getBoundingClientRect().width;
    
    // 오른쪽 사이드바 너비 조정
    if (rightSidebar) {
      const rightWidth = totalWidth - leftWidth - mainWidth;
      if (rightWidth >= 200) {
        rightSidebar.style.width = rightWidth + 'px';
      }
      
      // 그래프 뷰 리사이징 이벤트 발생
      const graphResizeEvent = new Event('graphResize');
      rightSidebar.dispatchEvent(graphResizeEvent);
    }
  });
  
  // 초기 그래프 뷰 리사이징 이벤트 발생
  if (rightSidebar) {
    setTimeout(function() {
      const graphResizeEvent = new Event('graphResize');
      rightSidebar.dispatchEvent(graphResizeEvent);
    }, 500);
  }
});
