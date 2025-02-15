// data.js

// 网站数据
let websites = JSON.parse(localStorage.getItem('websites')) || [];

// 添加网站
function addWebsite(name, url, description, category) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        websites.push({ name, url, description, category, user: user.email });
        localStorage.setItem('websites', JSON.stringify(websites));
    }
}

// 获取当前用户的网站
function getUserWebsites() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return websites.filter(website => website.user === user.email);
}

// 删除网站
function deleteWebsite(index) {
    websites.splice(index, 1);
    localStorage.setItem('websites', JSON.stringify(websites));
}

// 编辑网站
function editWebsite(index, name, url, description, category) {
    websites[index] = { name, url, description, category, user: websites[index].user };
    localStorage.setItem('websites', JSON.stringify(websites));
}