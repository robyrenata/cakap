import { Component, OnInit } from "@angular/core";
import { ReposService } from "src/app/shared/services/modules/repos.service";
import { GlobalService } from "src/app/shared/services/global.service";

@Component({
  selector: "app-repos",
  templateUrl: "./repos.component.html",
  styleUrls: ["./repos.component.scss"],
})
export class ReposComponent implements OnInit {
  repoList = [];
  urlRegex = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
  paginate = [];
  currPage = 1;
  constructor(private repoSrv: ReposService, private gs: GlobalService) {}

  ngOnInit() {
    this.getRepoList({ page: this.currPage, per_page: 2 });
  }

  getRepoList(pagination) {
    this.repoSrv.getRepoListByUser(pagination).subscribe((res: any) => {
      if (res.status === 200) {
        this.gs.log("res repo headers", res.headers.get("link"));
        this.repoList = res.body;

        const linkHeaders = res.headers.get("link");
        let extractedpage = this.getCount(pagination["per_page"], linkHeaders);
        this.gs.log("extracted", extractedpage);
      }
    });
  }

  getCount(limit, link) {
    let links = link.match(/(https?:\/\/[^\s]+)/g);
    let purified = links[1].substring(0, links[1].length - 2);
    let count = parseInt(purified.split("&page=").pop());

    if (!this.paginate.length) {
      for (var i = 1; i <= count; i++) {
        this.paginate.push(i);
      }
    }

    this.gs.log("paginate", this.paginate);

    return purified;
  }

  changePage(type = "default", index = this.currPage) {
    this.gs.log("type?", type);
    if (type === "next" && index <= this.paginate.length - 1) {
      this.currPage++;
      this.getRepoList({ page: this.currPage, per_page: 2 });
    } else if (type === "prev" && index >= 1) {
      this.currPage--;
      this.getRepoList({ page: this.currPage, per_page: 2 });
    } else {
      this.getRepoList({ page: index, per_page: 2 });
    }
  }
}
