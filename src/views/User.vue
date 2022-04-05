<template>
    <div>

        <div style="margin: 10px 0">
            <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search"
                      v-model="username"></el-input>
            <el-input style="width: 200px" placeholder="请输入邮箱" suffix-icon="el-icon-message" v-model="email"
                      class="ml-5"></el-input>
            <el-input style="width: 200px" placeholder="请输入地址" suffix-icon="el-icon-position" v-model="address"
                      class="ml-5"></el-input>
            <el-button class="ml-5" type="primary" @click="queryUsers">搜索</el-button>
            <el-button type="warning" @click="reset">重置</el-button>
        </div>

        <div style="margin: 10px 0">
            <el-button type="primary" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i>
            </el-button>

            <el-popconfirm
                    class="ml-5"
                    confirm-button-text='确定'
                    cancel-button-text='我再想想'
                    icon="el-icon-info"
                    icon-color="red"
                    title="您确定批量删除这些数据吗？"
                    @confirm="batchDel"
            >
                <el-button type="danger" slot="reference">批量删除 <i class="el-icon-remove-outline"></i></el-button>
            </el-popconfirm>
            <el-upload :action="'http://'+serverIp+':8895/user/import'" :show-file-list="false" accept="xlsx" :on-success="handleExcelImportSuccess" style="display: inline-block">
                <el-button type="primary" class="ml-5">导入 <i class="el-icon-bottom"></i></el-button>
            </el-upload>
            <el-button type="primary" @click="exp" class="ml-5">导出 <i class="el-icon-top"></i></el-button>

        </div>

        <el-table :data="tableData" border stripe :header-cell-class-name="headerBg"  @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column align="center" prop="id" label="ID" width="80"></el-table-column>
            <el-table-column align="center" prop="username" label="用户名" width="140"></el-table-column>
            <el-table-column prop="nickname" label="昵称" width="120"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="phone" label="电话"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    {{scope.row}}
                    <el-button type="success" @click="edit(scope.row)">编辑 <i class="el-icon-edit"></i>
                    </el-button>
                    <el-popconfirm
                            class="ml-5"
                            confirm-button-text='确定'
                            cancel-button-text='我再想想'
                            icon="el-icon-info"
                            icon-color="red"
                            title="您确定删除吗？"
                            @confirm="delUser(scope.row.id)"
                    >
                        <el-button type="danger" slot="reference">删除 <i class="el-icon-remove-outline"></i>
                        </el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <div style="padding: 10px 0">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[2, 5, 10, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>


        <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="30%">
            <el-form label-width="80px" size="small">
                <el-form-item label="用户名">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="form.nickname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {serverIp} from "../../public/config";

    export default {
        data(){
            return{
                serverIp:serverIp,
                tableData: [1],
                total: 0,
                pageNum: 1,
                pageSize: 10,
                username: "",
                email: "",
                address: "",
                form: {},
                dialogFormVisible: false,
                multipleSelection: [],//存放要删除的数据
                headerBg: 'headerBg',
            }
        },
        created() {
            this.loadPage()
        },
        methods:{
            loadPage() {
                this.request({
                    method: "get", //请求方式
                    url: "/user/page",  //请求路径
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                        username: this.username,
                        email: this.email,
                        address: this.address,
                    }
                }).then(result => {
                    var page = result
                    this.tableData = page.records
                    this.total = page.total
                })

                /*        request.get("http://localhost:8895/user/page?pageNum="+this.pageNum+"&pageSize=" + this.pageSize + "&username=" + this.username).then(res=>{
                          console.log(res)
                        })*/
            },

            handleSizeChange(pageSize) {
                console.log(`每页 ${pageSize} 条`);
                this.pageSize = pageSize
                this.loadPage()
            },
            handleCurrentChange(pageNum) {
                console.log(`当前页: ${pageNum}`);
                this.pageNum = pageNum
                this.loadPage()
            },
            queryUsers() {
                this.pageNum = 1//查询时，都将从第一页展示
                this.loadPage()
            },
            reset() {
                this.username = ""
                this.email = ""
                this.address = ""
                this.pageNum = 1
                this.loadPage()
            },
            handleAdd() {
                this.dialogFormVisible = true
                this.form = {}
            },
            saveOrUpdate() {
                this.request({
                    method: "post", //请求方式
                    url: "/user/saveOrUpdate",  //请求路径
                    params: this.form,
                }).then(result => {
                    var flag = result
                    if (flag) {
                        this.$message.success("保存成功")
                        this.dialogFormVisible = false
                        this.loadPage()
                    } else {
                        this.$message.error("保存失败")
                    }
                })
            },
            edit(row) {
                this.form = row
                this.dialogFormVisible = true
                console.log(row)
            },
            delUser(id) {

                this.request({
                    method: "post", //请求方式
                    url: "/user/delUser",  //请求路径
                    params: {
                        id: id,
                    },
                }).then(result => {
                    var flag = result
                    if (flag) {
                        this.$message.success("删除成功")
                        this.loadPage()
                    } else {
                        this.$message.error("删除失败")
                    }
                })
            },
            handleSelectionChange(val){
                this.multipleSelection=val
            },
            batchDel(){
                this.multipleSelection.map(((value, index, array) => {
                    console.log(value)
                    console.log(index)
                    console.log(array)
                }))
                let ids=this.multipleSelection.map(v=>v.id)
                console.log(ids)
                this.request({
                    method: "post", //请求方式
                    url: "/user/batchDelUsers",  //请求路径
                    params: {
                        ids:ids+""
                    },
                }).then(result => {
                    var flag = result
                    if (flag) {
                        this.$message.success("删除成功")
                        this.loadPage()
                    } else {
                        this.$message.error("删除失败")
                    }
                })

            },

            exp() {
                window.open("http://"+this.serverIp+":8895/user/export")
            },

            handleExcelImportSuccess() {
                this.$message.success("导入成功")
                this.loadPage()
            }
        }
    }
</script>

<style>
    .headerBg {
        background: #eee !important;
    }
</style>
