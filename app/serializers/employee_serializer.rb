class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :age, :city
end
