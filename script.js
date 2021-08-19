$(document).ready(function () {
  $.get("menu.json", function (data) {
    // console.log("Linear:", JSON.stringify(data));
    // debugger;
    console.log("Linear:",data);
    let visited = [];
    for(let i=0; i<data.length; i++) visited.push(false);
    data = generateDataTree(data,visited);
    // console.log("Nested:",JSON.stringify(data));
    console.log("Nested:",data);
    output = `<ul class="none">`;

    for (let i in data) {
      output += `<li class="listSpace">`;
      output += dataToHTML(data[i]);
      output += `</li>`;
    }

    output += `</ul>`;
    $("#Menu").html(output);
  });
});

function generateDataTree(data, visited, parent=0) {
  let ans=[];
  for(let i=0; i<data.length; i++) {
    if(visited[i] || data[i].pid!=parent) continue;
    visited[i] = true;
    let tmp = {};
    tmp.id = [data[i].name, data[i].icon];
    let sub = generateDataTree(data, visited, data[i].id);
    if(sub) tmp.sub = sub;
    ans.push(tmp);
  }
  if(ans.length==0) return null;
  return ans;
}

/* $("summary").click(function () {
  window.location = $(this).find("a").attr("href");
  return false;
}); */

function dataToHTML(data) {
  output = "";

  if (data.sub) {
    output = `<details>`;
    output += `<summary><i class="${data.id[1]} space" aria-hidden="true"></i>${data.id[0]}</summary><ul class="ulist">`;
    for (let i in data.sub) {
      output += `<li class="listSpace">`;
      output += dataToHTML(data.sub[i]);
      output += `</li>`;
    }
    output += `</details>`;
  } else {
    output = `<a href='#'><i class="${data.id[1]} space" aria-hidden="true"></i>${data.id[0]}</a>`;
  }

  return output;
}
