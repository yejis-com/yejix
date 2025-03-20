document.addEventListener('DOMContentLoaded', function() {
  const leftSidebar = document.querySelector('.left-sidebar');
  const mainContent = document.querySelector('.main-content');
  const rightSidebar = document.querySelector('.right-graph-sidebar');
  
  let isResizingLeft = false;
  let isResizingRight = false;
  let startX, startLeftWidth, startMainWidth, startRightWidth;
  
  // 왼쪽 사이드바 리사이징
  leftSidebar.addEventListener('mousedown', function(e) {
    // 오른쪽 가장자리 영역에서만 리사이징 활성화
    if (e.clientX > leftSidebar.getBoundingClientRect().right - 8) {
      isResizingLeft = true;
      startX = e.clientX;
      startLeftWidth = leftSidebar.offsetWidth;
      document.body.style.cursor = 'ew-resize';
      e.preventDefault();
    }
  });
  
  // 메인 콘텐츠 리사이징
  mainContent.addEventListener('mousedown', function(e) {
    // 오른쪽 가장자리 영역에서만 리사이징 활성화
    if (e.clientX > mainContent.getBoundingClientRect().right - 8) {
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
      leftSidebar.style.width = (startLeftWidth + diffX) + 'px';
    } else if (isResizingRight) {
      const containerWidth = document.querySelector('.content-container').offsetWidth;
      const diffX = e.clientX - startX;
      
      // 메인 콘텐츠와 오른쪽 사이드바의 너비 조정
      const newMainWidth = startMainWidth + diffX;
      const newRightWidth = containerWidth - newMainWidth - leftSidebar.offsetWidth;
      
      if (newMainWidth >= 300 && newRightWidth >= 200) {
        mainContent.style.flex = '0 0 ' + newMainWidth + 'px';
        rightSidebar.style.width = newRightWidth + 'px';
      }
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
    if (touch.clientX > leftSidebar.getBoundingClientRect().right - 8) {
      isResizingLeft = true;
      startX = touch.clientX;
      startLeftWidth = leftSidebar.offsetWidth;
    }
  });
  
  mainContent.addEventListener('touchstart', function(e) {
    const touch = e.touches[0];
    if (touch.clientX > mainContent.getBoundingClientRect().right - 8) {
      isResizingRight = true;
      startX = touch.clientX;
      startMainWidth = mainContent.offsetWidth;
      startRightWidth = rightSidebar.offsetWidth;
    }
  });
  
  document.addEventListener('touchmove', function(e) {
    if (isResizingLeft || isResizingRight) {
      e.preventDefault();
      const touch = e.touches[0];
      
      if (isResizingLeft) {
        const diffX = touch.clientX - startX;
        leftSidebar.style.width = (startLeftWidth + diffX) + 'px';
      } else if (isResizingRight) {
        const containerWidth = document.querySelector('.content-container').offsetWidth;
        const diffX = touch.clientX - startX;
        
        const newMainWidth = startMainWidth + diffX;
        const newRightWidth = containerWidth - newMainWidth - leftSidebar.offsetWidth;
        
        if (newMainWidth >= 300 && newRightWidth >= 200) {
          mainContent.style.flex = '0 0 ' + newMainWidth + 'px';
          rightSidebar.style.width = newRightWidth + 'px';
        }
      }
    }
  });
  
  document.addEventListener('touchend', function() {
    isResizingLeft = false;
    isResizingRight = false;
  });
});
