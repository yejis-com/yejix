document.addEventListener('DOMContentLoaded', function() {
  const leftSidebar = document.getElementById('left-sidebar');
  const mainContent = document.getElementById('main-content');
  const rightSidebar = document.getElementById('right-graph-sidebar');
  const rightResizer = document.getElementById('right-resizer');
  const container = document.querySelector('.content-container');
  
  let isResizingLeft = false;
  let isResizingRight = false;
  let startX, startLeftWidth, startMainWidth, startRightWidth;
  
  // 왼쪽 사이드바 리사이징
  leftSidebar.addEventListener('mousedown', function(e) {
    // 오른쪽 가장자리 영역에서만 리사이징 활성화
    const rect = leftSidebar.getBoundingClientRect();
    if (e.clientX > rect.right - 10 && e.clientX < rect.right + 10) {
      isResizingLeft = true;
      startX = e.clientX;
      startLeftWidth = leftSidebar.offsetWidth;
      startMainWidth = mainContent.offsetWidth;
      document.body.style.cursor = 'ew-resize';
      e.preventDefault();
    }
  });
  
  // 오른쪽 리사이저 요소로 리사이징
  if (rightResizer) {
    rightResizer.addEventListener('mousedown', function(e) {
      isResizingRight = true;
      startX = e.clientX;
      startMainWidth = mainContent.offsetWidth;
      startRightWidth = rightSidebar.offsetWidth;
      document.body.style.cursor = 'ew-resize';
      e.preventDefault();
    });
    
    // 터치 디바이스 지원
    rightResizer.addEventListener('touchstart', function(e) {
      const touch = e.touches[0];
      isResizingRight = true;
      startX = touch.clientX;
      startMainWidth = mainContent.offsetWidth;
      startRightWidth = rightSidebar.offsetWidth;
      e.preventDefault();
    });
  }
  
  // 메인 콘텐츠 리사이징
  mainContent.addEventListener('mousedown', function(e) {
    // 오른쪽 가장자리 영역에서만 리사이징 활성화
    const rect = mainContent.getBoundingClientRect();
    if (e.clientX > rect.right - 10 && e.clientX < rect.right + 10) {
      isResizingRight = true;
      startX = e.clientX;
      startMainWidth = mainContent.offsetWidth;
      startRightWidth = rightSidebar.offsetWidth;
      document.body.style.cursor = 'ew-resize';
      e.preventDefault();
    }
  });
  
  document.addEventListener('mousemove', function(e) {
    if (isResizingLeft) {
      const diffX = e.clientX - startX;
      const containerWidth = container.offsetWidth;
      
      // 새 너비 계산
      const newLeftWidth = Math.max(180, Math.min(startLeftWidth + diffX, containerWidth * 0.4));
      const newMainWidth = startMainWidth - (newLeftWidth - startLeftWidth);
      
      // 너비 적용
      leftSidebar.style.width = newLeftWidth + 'px';
      mainContent.style.width = newMainWidth + 'px';
      
    } else if (isResizingRight) {
      const diffX = e.clientX - startX;
      const containerWidth = container.offsetWidth;
      
      // 새 너비 계산 - 리사이저 방향 반대로 적용 (왼쪽에서 오른쪽으로 드래그하면 그래프 영역이 작아짐)
      const newMainWidth = Math.max(300, Math.min(startMainWidth - diffX, containerWidth - 200 - leftSidebar.offsetWidth));
      const newRightWidth = containerWidth - newMainWidth - leftSidebar.offsetWidth;
      
      // 너비 적용
      mainContent.style.width = newMainWidth + 'px';
      rightSidebar.style.width = newRightWidth + 'px';
    }
  });
  
  document.addEventListener('mouseup', function() {
    isResizingLeft = false;
    isResizingRight = false;
    document.body.style.cursor = '';
  });
  
  // 터치 디바이스 지원
  leftSidebar.addEventListener('touchstart', function(e) {
    const touch = e.touches[0];
    const rect = leftSidebar.getBoundingClientRect();
    if (touch.clientX > rect.right - 10 && touch.clientX < rect.right + 10) {
      isResizingLeft = true;
      startX = touch.clientX;
      startLeftWidth = leftSidebar.offsetWidth;
      startMainWidth = mainContent.offsetWidth;
      e.preventDefault();
    }
  });
  
  mainContent.addEventListener('touchstart', function(e) {
    const touch = e.touches[0];
    const rect = mainContent.getBoundingClientRect();
    if (touch.clientX > rect.right - 10 && touch.clientX < rect.right + 10) {
      isResizingRight = true;
      startX = touch.clientX;
      startMainWidth = mainContent.offsetWidth;
      startRightWidth = rightSidebar.offsetWidth;
      e.preventDefault();
    }
  });
  
  document.addEventListener('touchmove', function(e) {
    if (isResizingLeft || isResizingRight) {
      e.preventDefault();
      const touch = e.touches[0];
      
      if (isResizingLeft) {
        const diffX = touch.clientX - startX;
        const containerWidth = container.offsetWidth;
        
        // 새 너비 계산
        const newLeftWidth = Math.max(180, Math.min(startLeftWidth + diffX, containerWidth * 0.4));
        const newMainWidth = startMainWidth - (newLeftWidth - startLeftWidth);
        
        // 너비 적용
        leftSidebar.style.width = newLeftWidth + 'px';
        mainContent.style.width = newMainWidth + 'px';
        
      } else if (isResizingRight) {
        const diffX = touch.clientX - startX;
        const containerWidth = container.offsetWidth;
        
        // 새 너비 계산 - 리사이저 방향 반대로 적용
        const newMainWidth = Math.max(300, Math.min(startMainWidth - diffX, containerWidth - 200 - leftSidebar.offsetWidth));
        const newRightWidth = containerWidth - newMainWidth - leftSidebar.offsetWidth;
        
        // 너비 적용
        mainContent.style.width = newMainWidth + 'px';
        rightSidebar.style.width = newRightWidth + 'px';
      }
    }
  });
  
  document.addEventListener('touchend', function() {
    isResizingLeft = false;
    isResizingRight = false;
  });
  
  // 윈도우 크기 조정 시 레이아웃 재조정
  window.addEventListener('resize', function() {
    const containerWidth = container.offsetWidth;
    
    // 사이드바가 너무 넓으면 조정
    if (leftSidebar.offsetWidth > containerWidth * 0.4) {
      leftSidebar.style.width = (containerWidth * 0.4) + 'px';
    }
    
    // 오른쪽 사이드바가 너무 넓으면 조정
    if (rightSidebar.offsetWidth > containerWidth * 0.4) {
      rightSidebar.style.width = (containerWidth * 0.4) + 'px';
    }
    
    // 메인 콘텐츠 너비 조정
    const mainWidth = containerWidth - leftSidebar.offsetWidth - rightSidebar.offsetWidth;
    mainContent.style.width = mainWidth + 'px';
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
    
    // 리사이저 위치 설정
    if (rightResizer) {
      rightResizer.style.left = '0';
    }
  }
  
  // 페이지 로드 시 레이아웃 초기화
  initLayout();
});
