namespace js fahrradflucht.thrift.math

struct AddRequest {
    1: required list<i64> terms,
}

struct AddResponse {
    1: required i64 result
}

exception UnknownException {
    1: optional string message = "Unknown"
}

service MathService {
    AddResponse add(1: required AddRequest request) throws (
        1: UnknownException unknown,
    )
}
