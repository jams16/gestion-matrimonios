import 'package:flutter/material.dart';

class AppNumberField extends StatefulWidget {
  const AppNumberField({
    super.key,
    required this.label,
    this.initialValue = 0,
    this.min,
    this.max,
    this.step = 1,
    this.helperText,
    this.errorText,
    this.onChanged,
  });

  final String label;

  final num initialValue;
  final num? min;
  final num? max;
  final num step;

  final String? helperText;
  final String? errorText;

  final ValueChanged<num>? onChanged;

  @override
  State<AppNumberField> createState() => _AppNumberFieldState();
}

class _AppNumberFieldState extends State<AppNumberField> {
  late num _value;
  late final TextEditingController _controller;

  @override
  void initState() {
    super.initState();

    _value = widget.initialValue;

    _controller = TextEditingController(
      text: _format(_value),
    );
  }

  String _format(num value) {
    if (value % 1 == 0) {
      return value.toInt().toString();
    }

    return value.toString();
  }

  void _setValue(num value) {
    if (widget.min != null && value < widget.min!) {
      value = widget.min!;
    }

    if (widget.max != null && value > widget.max!) {
      value = widget.max!;
    }

    setState(() {
      _value = value;

      _controller.text = _format(_value);
    });

    widget.onChanged?.call(_value);
  }

  void _decrease() {
    _setValue(_value - widget.step);
  }

  void _increase() {
    _setValue(_value + widget.step);
  }

  void _onTextChanged(String value) {
    final parsed = num.tryParse(
      value.replaceAll(',', '.'),
    );

    if (parsed == null) {
      return;
    }

    _value = parsed;
    widget.onChanged?.call(_value);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final canDecrease =
        widget.min == null || _value > widget.min!;

    final canIncrease =
        widget.max == null || _value < widget.max!;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          widget.label,
          style: Theme.of(context).textTheme.labelMedium?.copyWith(
                fontWeight: FontWeight.w500,
              ),
        ),

        const SizedBox(height: 7),

        Row(
          children: [
            IconButton.outlined(
              tooltip: 'Disminuir',
              onPressed: canDecrease ? _decrease : null,
              icon: const Icon(
                Icons.remove,
              ),
            ),

            const SizedBox(width: 8),

            Expanded(
              child: TextFormField(
                controller: _controller,
                textAlign: TextAlign.center,
                keyboardType: const TextInputType.numberWithOptions(
                  decimal: true,
                  signed: true,
                ),
                onChanged: _onTextChanged,
                decoration: InputDecoration(
                  errorText: widget.errorText,
                  helperText: widget.helperText,
                  isDense: true,
                ),
              ),
            ),

            const SizedBox(width: 8),

            IconButton.filled(
              tooltip: 'Aumentar',
              onPressed: canIncrease ? _increase : null,
              icon: const Icon(
                Icons.add,
              ),
            ),
          ],
        ),
      ],
    );
  }
}