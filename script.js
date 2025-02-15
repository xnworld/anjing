// script.js

// 从 localStorage 加载数据
let websites = JSON.parse(localStorage.getItem('websites')) || [];

// 渲染收录列表
function renderWebsites(filteredWebsites = null) {
    const dataToRender = filteredWebsites || websites;
    const websiteList = document.getElementById('websiteList');
    websiteList.innerHTML = '';
    dataToRender.forEach((website, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
            <div>
                <h3>${website.name}</h3>
                <p><a href="${website.url}" target="_blank">${website.url}</a></p>
                <p>${website.description}</p>
                <small>分类：${website.category}</small>
            </div>
            <div class="actions">
                <button class="btn btn-warning edit" onclick="editWebsite(${index})">编辑</button>
                <button class="btn btn-danger delete" onclick="deleteWebsite(${index})">删除</button>
            </div>
        `;
        websiteList.appendChild(li);
    });
}

// 添加网站
document.getElementById('submitForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const url = document.getElementById('url').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    if (name && url && description && category) {
        websites.push({ name, url, description, category });
        localStorage.setItem('websites', JSON.stringify(websites));
        renderWebsites();
        document.getElementById('submitForm').reset();
    } else {
        alert('请填写完整信息！');
    }
});

// 删除网站
function deleteWebsite(index) {
    if (confirm('确定要删除这条记录吗？')) {
        websites.splice(index, 1);
        localStorage.setItem('websites', JSON.stringify(websites));
        renderWebsites();
    }
}

// 编辑网站
function editWebsite(index) {
    const website = websites[index];
    document.getElementById('name').value = website.name;
    document.getElementById('url').value = website.url;
    document.getElementById('description').value = website.description;
    document.getElementById('category').value = website.category;

    // 移除旧记录
    websites.splice(index, 1);
    localStorage.setItem('websites', JSON.stringify(websites));
    renderWebsites();
}

// 搜索网站
document.getElementById('searchInput').addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    const filteredWebsites = websites.filter(
        (website) =>
            website.name.toLowerCase().includes(keyword) ||
            website.description.toLowerCase().includes(keyword)
    );
    renderWebsites(filteredWebsites);
});

// 初始化渲染
renderWebsites();