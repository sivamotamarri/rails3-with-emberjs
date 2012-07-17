class EmployeesController < ApplicationController
  # GET /employees
  # GET /employees.json
  def index
    @employees = Employee.paginate(:page => params[:page], :per_page => 3)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @employees }
    end
  end

  # GET /employees/1
  # GET /employees/1.json
  def show
    @employee = Employee.find(params[:id])

    respond_to do |format|     
      format.json { render json: @employee }
    end
  end

  def new
    session[:employee_step] = session[:employee_params] = nil
    session[:employee_params] ||= {}
      respond_to do |format|
         format.json { render json: {"new" => "ok"} }
      end
  end

  # POST /employees
  # POST /employees.json
  def create
    if session[:employee_params].nil?
      session[:employee_params] ||= {}
      session[:employee_step] = nil
      session[:employee_params].deep_merge!(params[:key1][:employee]) if params[:key1][:employee]
    else
      session[:employee_params].deep_merge!(params[:key1][:employee]) if params[:key1][:employee]
    end    
    @employee = Employee.new( session[:employee_params])
    
    @employee.current_step = session[:employee_step]
    respond_to do |format|

     
      if params[:back_button] == "prev"
        @employee.previous_step
        session[:employee_step] = @employee.current_step
        format.json { render json: {"new" => "ok"} }
      elsif @employee.last_step?
       if @employee.valid?     
        @employee.save if @employee.all_valid?
         session[:employee_step] = session[:employee_params] = nil
         format.json { render json: @employee, status: :created, location: @employee }
          else
         format.json { render json: @employee.errors, status: :unprocessable_entity }
        end       
      else
        if @employee.valid?         
         @employee.next_step
         session[:employee_step] = @employee.current_step
         format.json { render json: {"new" => "ok"} }
        else
         format.json { render json: @employee.errors, status: :unprocessable_entity }
        end
      end
    end
  end

  # PUT /employees/1
  # PUT /employees/1.json
  def update
    @employee = Employee.find(params[:id])

    respond_to do |format|
      if @employee.update_attributes(params[:employee])      
        format.json  { render json: nil, status: :ok }
      else      
        format.json { render json: @employee.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /employees/1
  # DELETE /employees/1.json
  def destroy
    @employee = Employee.find(params[:id])
    @employee.destroy

    respond_to do |format|      
      format.json { render json: nil, status: :ok }
    end
  end
end
