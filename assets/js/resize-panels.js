document.addEventListener('DOMContentLoaded', function() {
  const leftSidebar = document.getElementById('left-sidebar');
  const mainContent = document.getElementById('main-content');
  const rightSidebar = document.getElementById('right-graph-sidebar');
  const container = document.querySelector('.content-container');
  const notesGraph = document.getElementById('notes-graph');
  
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
      
      // 그래프 뷰 업데이트
      updateGraphView();
      
    } else if (isResizingRight) {
      const diffX = e.clientX - startX;
      const containerWidth = container.offsetWidth;
      
      // 새 너비 계산
      const newMainWidth = Math.max(300, Math.min(startMainWidth + diffX, containerWidth - 200 - leftSidebar.offsetWidth));
      const newRightWidth = containerWidth - newMainWidth - leftSidebar.offsetWidth;
      
      // 너비 적용
      mainContent.style.width = newMainWidth + 'px';
      rightSidebar.style.width = newRightWidth + 'px';
      
      // 그래프 뷰 업데이트
      updateGraphView();
    }
  });
  
  document.addEventListener('mouseup', function() {
    if (isResizingLeft || isResizingRight) {
      isResizingLeft = false;
      isResizingRight = false;
      document.body.style.cursor = '';
      
      // 리사이징 완료 후 그래프 뷰 업데이트
      updateGraphView();
    }
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
        
        // 그래프 뷰 업데이트
        updateGraphView();
        
      } else if (isResizingRight) {
        const diffX = touch.clientX - startX;
        const containerWidth = container.offsetWidth;
        
        // 새 너비 계산
        const newMainWidth = Math.max(300, Math.min(startMainWidth + diffX, containerWidth - 200 - leftSidebar.offsetWidth));
        const newRightWidth = containerWidth - newMainWidth - leftSidebar.offsetWidth;
        
        // 너비 적용
        mainContent.style.width = newMainWidth + 'px';
        rightSidebar.style.width = newRightWidth + 'px';
        
        // 그래프 뷰 업데이트
        updateGraphView();
      }
    }
  });
  
  document.addEventListener('touchend', function() {
    if (isResizingLeft || isResizingRight) {
      isResizingLeft = false;
      isResizingRight = false;
      
      // 리사이징 완료 후 그래프 뷰 업데이트
      updateGraphView();
    }
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
    
    // 그래프 뷰 업데이트
    updateGraphView();
  });
  
  // 그래프 뷰 업데이트 함수
  function updateGraphView() {
    // 그래프 뷰가 존재하는지 확인
    if (notesGraph) {
      // 그래프 뷰의 SVG 요소 찾기
      const graphSvg = notesGraph.querySelector('svg');
      if (graphSvg) {
        // 그래프 뷰의 너비와 높이를 부모 요소에 맞게 조정
        const graphWrapper = document.getElementById('graph-wrapper');
        if (graphWrapper) {
          graphWrapper.style.width = '100%';
          graphWrapper.style.height = '100%';
        }
        
        // SVG 요소의 너비와 높이 조정
        graphSvg.setAttribute('width', '100%');
        graphSvg.setAttribute('height', '100%');
        
        // 그래프 뷰의 D3 인스턴스가 있다면 강제로 다시 그리기
        if (window.d3 && window.graph) {
          try {
            window.graph.restart();
          } catch (e) {
            console.log('그래프 업데이트 중 오류 발생:', e);
          }
        }
      }
    }
  }
  
  // 초기 레이아웃 설정
  function initLayout() {
    const containerWidth = container.offsetWidth;
    const leftWidth = 250; // 초기 왼쪽 사이드바 너비
    const rightWidth = 300; // 초기 오른쪽 사이드바 너비
    const mainWidth = containerWidth - leftWidth - rightWidth;
    
    leftSidebar.style.width = leftWidth + 'px';
    mainContent.style.width = mainWidth + 'px';
    rightSidebar.style.width = rightWidth + 'px';
    
    // 초기 그래프 뷰 업데이트
    updateGraphView();
  }
  
  // 페이지 로드 시 레이아웃 초기화
  initLayout();
  
  // 그래프가 로드된 후 추가 업데이트를 위한 MutationObserver 설정
  if (rightSidebar) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // 그래프 뷰 업데이트
          updateGraphView();
        }
      });
    });
    
    // 오른쪽 사이드바의 변경 사항 관찰
    observer.observe(rightSidebar, { childList: true, subtree: true });
  }
});
