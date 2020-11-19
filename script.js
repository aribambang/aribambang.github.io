let papan = [];
let n = 0;

function mulai() {
  n = parseInt(document.getElementById('jmlhN').value);
  if (n >= 4 && n <= 8) {
    buatPapan(n);
    papan = [];
    for (i = 0; i < n; i++) {
      papan.push([]);
    }
    document.getElementById('selesai').style.visibility = 'visible';
    document.getElementById('hapus').style.visibility = 'visible';
  } else {
    return alert('Masukkan nilai n dengan 4 sampai 8');
  }
}

function bersihPapan() {
  for (i = 0; i < n; i++) {
    for (j = 0; j < n; j++) {
      let idx = i + '-' + j;
      let x = document.getElementById(idx);
      x.innerHTML = '';
      papan[i][j] = 0;
    }
  }
}

function cekBarisQueen(x, y) {
  // kanan
  for (i = y - 1; i >= 0; i--) {
    if (papan[x][i]) return [x, i];
  }
  // kiri
  for (i = y + 1; i < n; i++) {
    if (papan[x][i]) return [x, i];
  }
  // atas
  for (i = x - 1; i >= 0; i--) {
    if (papan[i][y]) return [i, y];
  }
  // bawah
  for (i = x + 1; i < n; i++) {
    if (papan[i][y]) return [i, y];
  }
  // diagonal atas kanan
  for (i = x - 1, j = y + 1; i >= 0 && j < n; i--, j++) {
    if (papan[i][j]) return [i, j];
  }
  // diagonal atas kiri
  for (i = x - 1, j = y - 1; j >= 0 && i >= 0; i--, j--) {
    if (papan[i][j]) return [i, j];
  }
  // diagonal bawah kiri
  for (i = x + 1, j = y - 1; i < n && j >= 0; i++, j--) {
    if (papan[i][j]) return [i, j];
  }
  // diagonal bawah kanan
  for (i = x + 1, j = y + 1; j < n && i < n; i++, j++) {
    if (papan[i][j]) return [i, j];
  }
  return false;
}

function cekPapan() {
  bacaPapan();
  let jmlh = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (papan[i][j]) {
        jmlh++;
        let mati = cekBarisQueen(i, j);
        if (mati) {
          return alert(
            `Queen pada [${i},${j}] bisa menyerang Queen pada [${mati[0]},${mati[1]}]`
          );
        }
      }
    }
  }
  if (jmlh == n) {
    return alert('Kamu berhasil !');
  } else {
    return alert('Queen kurang!');
  }
}

function buatPapan(n) {
  let html = '';
  html += '<tr><th></th>';
  for (let i = 0; i < n; i++) {
    html += `<th>${i}</th>`;
  }
  html += '</tr>';
  for (let i = 0; i < n; i++) {
    html += '<tr>';
    html += `<th>${i}</th>`;
    for (let j = 0; j < n; j++) {
      if (i % 2 === 1) {
        if (j % 2 === 1) {
          html += `<td style="background-color: white;" onclick="ganti(this.id)" id="${i}-${j}"></td>`;
        } else {
          html += `<td style="background-color: black;" onclick="ganti(this.id)" id="${i}-${j}"></td>`;
        }
      } else {
        if (j % 2 === 1) {
          html += `<td style="background-color: black;" onclick="ganti(this.id)" id="${i}-${j}"></td>`;
        } else {
          html += `<td style="background-color: white;" onclick="ganti(this.id)" id="${i}-${j}"></td>`;
        }
      }
    }
    html += '</tr>';
  }

  document.getElementById('table-body').innerHTML = html;
}

function bacaPapan() {
  let jmlh = 0;

  for (i = 0; i < n; i++) {
    for (j = 0; j < n; j++) {
      let idx = i + '-' + j;
      let x = document.getElementById(idx);

      if (x.innerHTML !== '') {
        jmlh++;
      }
    }
  }
  return jmlh;
}

function ganti(td) {
  let array = td.split('-', 2);
  let x = document.getElementById(td);

  if (x.innerHTML !== '' || bacaPapan() < n) {
    if (x.innerHTML === '') {
      x.innerHTML = '&#128081';
      papan[array[0]][array[1]] = 1;
    } else {
      x.innerHTML = '';
      papan[array[0]][array[1]] = 0;
    }
  } else {
    alert('Queen melebihi jumlah n');
  }
}
