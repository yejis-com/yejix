document.addEventListener('DOMContentLoaded', function() {
  const leftSidebar = document.getElementById('left-sidebar');
  const mainContent = document.getElementById('main-content');
  const rightSidebar = document.getElementById('right-graph-sidebar');
  const container = document.querySelector('.content-container');
  
  let isResizingLeft = false;
  let isResizingRight = false;
  let startX, startLeftWidth, startMainWidth, startRightWidth;
  
  // LocalStorage 키 설정
  const STORAGE_KEY = {
    LEFT_WIDTH: 'yejis-left-sidebar-width',
    MAIN_WIDTH: 'yejis-main-content-width',
    RIGHT_WIDTH: 'yejis-right-sidebar-width'
  };
  
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
      
      // 새 너비 계산
      const newMainWidth = Math.max(300, Math.min(startMainWidth + diffX, containerWidth - 200 - leftSidebar.offsetWidth));
      const newRightWidth = containerWidth - newMainWidth - leftSidebar.offsetWidth;
      
      // 너비 적용
      mainContent.style.width = newMainWidth + 'px';
      rightSidebar.style.width = newRightWidth + 'px';
    }
  });
  
  document.addEventListener('mouseup', function() {
    if (isResizingLeft || isResizingRight) {
      // 리사이징이 끝나면 LocalStorage에 너비 저장
      saveLayoutToLocalStorage();
    }
    
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
        
        // 새 너비 계산
        const newMainWidth = Math.max(300, Math.min(startMainWidth + diffX, containerWidth - 200 - leftSidebar.offsetWidth));
        const newRightWidth = containerWidth - newMainWidth - leftSidebar.offsetWidth;
        
        // 너비 적용
        mainContent.style.width = newMainWidth + 'px';
        rightSidebar.style.width = newRightWidth + 'px';
      }
    }
  });
  
  document.addEventListener('touchend', function() {
    if (isResizingLeft || isResizingRight) {
      // 리사이징이 끝나면 LocalStorage에 너비 저장
      saveLayoutToLocalStorage();
    }
    
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
    
    // 레이아웃 변경 후 LocalStorage에 저장
    saveLayoutToLocalStorage();
  });
  
  // 현재 레이아웃 너비를 LocalStorage에 저장하는 함수
  function saveLayoutToLocalStorage() {
    try {
      localStorage.setItem(STORAGE_KEY.LEFT_WIDTH, leftSidebar.offsetWidth);
      localStorage.setItem(STORAGE_KEY.MAIN_WIDTH, mainContent.offsetWidth);
      localStorage.setItem(STORAGE_KEY.RIGHT_WIDTH, rightSidebar.offsetWidth);
    } catch (e) {
      console.error('LocalStorage에 레이아웃 저장 실패:', e);
    }
  }
  
  // LocalStorage에서 레이아웃 정보를 불러오는 함수
  function loadLayoutFromLocalStorage() {
    try {
      const leftWidth = parseInt(localStorage.getItem(STORAGE_KEY.LEFT_WIDTH));
      const mainWidth = parseInt(localStorage.getItem(STORAGE_KEY.MAIN_WIDTH));
      const rightWidth = parseInt(localStorage.getItem(STORAGE_KEY.RIGHT_WIDTH));
      
      const containerWidth = container.offsetWidth;
      
      // 저장된 값이 있고 유효한 경우에만 적용
      if (leftWidth && mainWidth && rightWidth && 
          leftWidth + mainWidth + rightWidth <= containerWidth) {
        leftSidebar.style.width = leftWidth + 'px';
        mainContent.style.width = mainWidth + 'px';
        rightSidebar.style.width = rightWidth + 'px';
        return true;
      }
    } catch (e) {
      console.error('LocalStorage에서 레이아웃 불러오기 실패:', e);
    }
    return false;
  }
  
  // 초기 레이아웃 설정
  function initLayout() {
    const containerWidth = container.offsetWidth;
    
    // LocalStorage에서 이전 레이아웃을 불러오기 시도
    if (!loadLayoutFromLocalStorage()) {
      // 저장된 값이 없거나 유효하지 않은 경우 기본값 사용
      const leftWidth = 250; // 초기 왼쪽 사이드바 너비
      const rightWidth = 300; // 초기 오른쪽 사이드바 너비
      const mainWidth = containerWidth - leftWidth - rightWidth;
      
      leftSidebar.style.width = leftWidth + 'px';
      mainContent.style.width = mainWidth + 'px';
      rightSidebar.style.width = rightWidth + 'px';
      
      // 초기 설정 후 저장
      saveLayoutToLocalStorage();
    }
  }
  
  // 페이지 로드 시 레이아웃 초기화
  initLayout();
});
