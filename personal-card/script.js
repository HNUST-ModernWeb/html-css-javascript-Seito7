// 加载并绑定初始数据
document.addEventListener('DOMContentLoaded', () => {
  const avatar = document.getElementById('avatar');
  const avatarInput = document.getElementById('avatarInput');
  const nameDisplay = document.getElementById('nameDisplay');
  const bioDisplay = document.getElementById('bioDisplay');
  const nameInput = document.getElementById('nameInput');
  const bioInput = document.getElementById('bioInput');
  const saveBtn = document.getElementById('saveBtn');

  // 从 localStorage 恢复（如果有）
  try {
    const storedName = localStorage.getItem('pc_name');
    const storedBio = localStorage.getItem('pc_bio');
    const storedAvatar = localStorage.getItem('pc_avatar');
    if (storedName) { nameDisplay.textContent = storedName; nameInput.value = storedName }
    if (storedBio) { bioDisplay.textContent = storedBio; bioInput.value = storedBio }
    if (storedAvatar) avatar.src = storedAvatar
  } catch (e) { /* ignore storage errors */ }

  // 保存按钮
  saveBtn.addEventListener('click', () => {
    const name = nameInput.value.trim() || '你的姓名';
    const bio = bioInput.value.trim() || '简短个人简介会显示在这里。';
    nameDisplay.textContent = name;
    bioDisplay.textContent = bio;
    try { localStorage.setItem('pc_name', name); localStorage.setItem('pc_bio', bio) } catch (e) {}
  });

  // 头像上传与实时预览
  avatarInput.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      avatar.src = reader.result;
      try { localStorage.setItem('pc_avatar', reader.result) } catch (e) {}
    };
    reader.readAsDataURL(file);
  });
});
