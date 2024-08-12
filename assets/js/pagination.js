document.addEventListener("DOMContentLoaded", function () {
    const postsPerPage = 10; // 페이지당 포스트 수

    // JSON 데이터 읽기
    const postData = JSON.parse(document.getElementById('post-data').textContent);
    const posts = postData.posts;

    const postList = document.getElementById('post-list');
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(posts.length / postsPerPage);

    let currentPage = 1;

    function displayPosts(pageNumber) {
        postList.innerHTML = '';
        const start = (pageNumber - 1) * postsPerPage;
        const end = start + postsPerPage;
        const paginatedPosts = posts.slice(start, end);

        paginatedPosts.forEach(post => {
            const postItem = document.createElement('ul');
            postItem.innerHTML = `
                <li class="wow fadeInLeft" data-wow-duration="1.5s">
                    <a class="zoombtn" href="${post.url}">${post.title}</a>
                    <p>${post.excerpt}</p>
                    <a href="${post.url}" class="btn zoombtn">Read More</a>
                </li>
            `;
            postList.appendChild(postItem);
        });
    }

    function setupPagination() {
        pagination.innerHTML = '';
        const fragment = document.createDocumentFragment();

        // 이전 페이지 버튼
        if (currentPage > 1) {
            const prevButton = document.createElement('a');
            prevButton.href = "#";
            prevButton.textContent = "Prev";
            prevButton.className = 'btn zoombtn';
            prevButton.addEventListener('click', function (e) {
                e.preventDefault();
                currentPage--;
                displayPosts(currentPage);
                setupPagination();
            });
            fragment.appendChild(prevButton);
        }

        // 현재 페이지 및 주변 페이지 표시
        for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
            const pageButton = document.createElement('a');
            pageButton.href = "#";
            pageButton.textContent = i;
            pageButton.className = 'btn zoombtn';
            if (i === currentPage) pageButton.classList.add('current');
            pageButton.addEventListener('click', function (e) {
                e.preventDefault();
                currentPage = i;
                displayPosts(currentPage);
                setupPagination();
            });
            fragment.appendChild(pageButton);
        }

        // 다음 페이지 버튼
        if (currentPage < totalPages) {
            const nextButton = document.createElement('a');
            nextButton.href = "#";
            nextButton.textContent = "Next";
            nextButton.className = 'btn zoombtn';
            nextButton.addEventListener('click', function (e) {
                e.preventDefault();
                currentPage++;
                displayPosts(currentPage);
                setupPagination();
            });
            fragment.appendChild(nextButton);
        }

        pagination.appendChild(fragment);
    }

    // 초기 설정
    setupPagination();
    displayPosts(currentPage); // 초기 페이지를 1로 설정
});
